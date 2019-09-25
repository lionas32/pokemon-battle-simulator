import React from "react";
import styles from "./pokemonTab.module.css";
import { connect } from "react-redux";
import { changePokemon, setPokemonAliveLeft } from "./redux/actions/actions";

const PokemonTab = props => {
  const pokemonList = props.pokemonList;

  const changePokemon = index => {
    props.changePokemon(index);
  };

  return (
    <div className={styles.PokemonTab}>
      {pokemonList.map((e, index) => (
        <div
          key={index}
          onClick={() => changePokemon(index)}
          className={
            props.index === index
              ? [styles.PokemonBall, styles.Selected].join(" ")
              : styles.PokemonBall
          }
        >
          <img alt="Pokemon" className={styles.PokemonImage} src={e.sprite} />
        </div>
      ))}
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    changePokemon: index => dispatch(changePokemon(index)),
    setPokemonAliveLeft: alive => dispatch(setPokemonAliveLeft(alive))
  };
};

export default connect(
  state => {
    return {
      index: state.index,
      hpLeft: state.hpLeft
    };
  },
  mapDispatchToProps
)(PokemonTab);
