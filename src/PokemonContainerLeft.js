import React from "react";
import * as api from "./api";
import Pokemon from "./Pokemon";
import PokemonTab from "./PokemonTab";
import missing_no from "./images/missing_no.png";
import { connect } from "react-redux";
import WinnerDisplay from "./WinnerDisplay";

import {
  attackPokemonRight,
  setPokemonAliveRight,
  changeTurn,
  changeHpLeft,
  setPokemonAliveLeft
} from "./redux/actions/actions";

const PokemonContainerLeft = props => {
  const [pokemon, setPokemon] = React.useState([]);
  const [hpColor, setHpColor] = React.useState("green");
  const [attacking, setAttacking] = React.useState(false);
  const [displayWin, setDisplayWin] = React.useState(false);
  const mainPokemon = pokemon[props.index];

  const {
    hpRight,
    hpLeft,
    attackPokemonRight,
    setPokemonAliveRight,
    setPokemonAliveLeft,
    changeTurn,
    damageDoneLeft,
    changeHpLeft,
    side
  } = props;

  const attackPokemon = React.useCallback(
    (e = null) => {
      let validMove = e === null || e.code === "Space";

      if (validMove) {
        if (hpLeft === 0 || side !== "left") {
          return;
        }
      }
      if (!attacking) {
        const damage = Math.ceil(Math.random() * 10) + 5;
        setAttacking(true);
        setTimeout(() => {
          setAttacking(false);
        }, 1000);

        if (damage >= hpRight) {
          attackPokemonRight(hpRight);
          setPokemonAliveRight(false);
        } else {
          attackPokemonRight(damage);
        }
        changeTurn("right");
      }
    },
    [
      attacking,
      attackPokemonRight,
      hpRight,
      setPokemonAliveRight,
      hpLeft,
      changeTurn,
      side
    ]
  );

  React.useEffect(() => {
    for (let i = 0; i < 3; i++) {
      api.getRandomPokemon().then(data =>
        setPokemon(p =>
          p.concat({
            name: data.name,
            sprite: data.sprites.front_default,
            hp: 100
          })
        )
      );
    }
  }, []);

  React.useEffect(() => {
    if (hpRight === 0) {
      setDisplayWin(true);
    }
  }, [hpRight]);

  React.useEffect(() => {
    window.addEventListener("keypress", attackPokemon);
    return () => {
      window.removeEventListener("keypress", attackPokemon);
    };
  }, [attackPokemon]);

  React.useEffect(() => {
    setPokemon(p =>
      p.map((e, index) => {
        if (props.index === index) {
          return {
            ...e,
            hp: e.hp - damageDoneLeft
          };
        }
        return e;
      })
    );
  }, [damageDoneLeft]);

  React.useEffect(() => {
    if (hpLeft >= 50) {
      setTimeout(() => {
        setHpColor("green");
      }, 200);
    } else if (hpLeft < 50 && hpLeft >= 20) {
      setTimeout(() => {
        setHpColor("yellow");
      }, 200);
    } else if (hpLeft < 20 && hpLeft >= 0) {
      setTimeout(() => {
        setHpColor("red");
      }, 200);
    }
  }, [hpLeft]);

  React.useEffect(() => {
    setPokemon(p =>
      p.map((e, index) => {
        if (props.index === index) {
          if (e.hp !== 0) {
            changeHpLeft(e.hp);
            setPokemonAliveLeft(true);
          } else {
            changeHpLeft(e.hp);
            setPokemonAliveLeft(false);
          }
          return {
            ...e,
            hp: e.hp
          };
        }
        return e;
      })
    );
  }, [props.index, changeHpLeft, setPokemonAliveLeft]);

  if (pokemon.length !== 3) {
    return <Pokemon img={missing_no} />;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      {displayWin ? <WinnerDisplay /> : null}
      <Pokemon
        attacking={attacking}
        hp={hpLeft}
        attack
        left
        img={mainPokemon.sprite}
        color={hpColor}
        attackFunc={attackPokemon}
      >
        {mainPokemon.name}
      </Pokemon>
      <PokemonTab pokemonList={pokemon} />
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    attackPokemonRight: damage => dispatch(attackPokemonRight(damage)),
    setPokemonAliveRight: alive => dispatch(setPokemonAliveRight(alive)),
    changeTurn: side => dispatch(changeTurn(side)),
    changeHpLeft: hp => dispatch(changeHpLeft(hp)),
    setPokemonAliveLeft: alive => dispatch(setPokemonAliveLeft(alive))
  };
};

export default connect(
  state => state,
  mapDispatchToProps
)(PokemonContainerLeft);
