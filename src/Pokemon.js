import React from "react";
import styles from "./pokemon.module.css";
import { Line } from "rc-progress";
import { Animated } from "react-animated-css";

export default function Pokemon(props) {
  const idle = "pulse infinite";
  const attack = "wobble 2s";

  const [animation, setAnimation] = React.useState(idle);
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    if (props.attacking) {
      setAnimation(attack);
      setVisible(v => !v);
    } else if (!props.attacking) {
      setAnimation(idle);
      setVisible(v => !v);
    }
  }, [props.attacking]);

  return (
    <div
      className={styles.PokemonContainer}
      onClick={() => {
        if (props.left) props.attackFunc();
      }}
    >
      {props.children}
      <Animated
        animationIn={animation}
        animationOut={animation}
        isVisible={visible}
      >
        <img
          className={
            props.left
              ? [styles.PokemonImage, styles.PokemonImageFlipped].join(" ")
              : styles.PokemonImage
          }
          alt="pokemon"
          src={props.img}
        />
      </Animated>
      <Line
        className={styles.ProgressBar}
        trailWidth={2}
        percent={props.hp}
        strokeWidth="1"
        strokeColor={props.color}
      />
    </div>
  );
}
