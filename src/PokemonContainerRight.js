import React from "react";
import * as api from "./api";
import Pokemon from "./Pokemon";
import missing_no from "./images/missing_no.png";
import { connect } from "react-redux";
import {
  attackPokemonLeft,
  setPokemonAliveLeft,
  changeTurn
} from "./redux/actions/actions";
import { useInterval } from "./hooks";

const PokemonContainerRight = props => {
  const [pokemon, setPokemon] = React.useState(null);
  const [hpColor, setHpColor] = React.useState("green");
  const [attacking, setAttacking] = React.useState(false);

  const {
    hpLeft,
    attackPokemonLeft,
    setPokemonAliveLeft,
    changeTurn,
    hpRight,
    aliveLeft,
    aliveRight,
    side
  } = props;

  const attackPokemon = () => {
    if (!attacking) {
      const damage = Math.ceil(Math.random() * 10) + 10;

      setAttacking(true);
      setTimeout(() => {
        setAttacking(false);
        changeTurn("left");
      }, 900);

      if (damage >= hpLeft) {
        attackPokemonLeft(hpLeft);
        setPokemonAliveLeft(false);
      } else {
        attackPokemonLeft(damage);
      }
    }
  };

  React.useEffect(() => {
    api.getRandomPokemon().then(data => setPokemon(data));
  }, []);

  React.useEffect(() => {
    if (hpRight < 50 && hpRight >= 20) {
      setTimeout(() => {
        setHpColor("yellow");
      }, 200);
    } else if (hpRight < 20 && hpRight >= 0) {
      setTimeout(() => {
        setHpColor("red");
      }, 200);
    }
  }, [hpRight]);

  const divRef = React.useRef();

  useInterval(
    attackPokemon,
    aliveLeft && aliveRight && side === "right" ? 2000 : null
  );

  if (!pokemon) {
    return <Pokemon img={missing_no} />;
  }

  return (
    <div ref={divRef}>
      <Pokemon
        attacking={attacking}
        hp={props.hpRight}
        attack
        img={pokemon.sprites.front_default}
        color={hpColor}
      >
        {pokemon.name}
      </Pokemon>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    attackPokemonLeft: damage => dispatch(attackPokemonLeft(damage)),
    setPokemonAliveLeft: alive => dispatch(setPokemonAliveLeft(alive)),
    changeTurn: side => dispatch(changeTurn(side))
  };
};

export default connect(
  state => state,
  mapDispatchToProps
)(PokemonContainerRight);
