import React from "react";
import { Animated } from "react-animated-css";

export default function WinnerDisplay() {
  return (
    <div
      style={{
        width: "100%",
        position: "fixed",
        right: "0%",
        bottom: "70%",
        textAlign: "center"
      }}
    >
      <Animated animationIn={"pulse infinite"}>
        <h1
          style={{
            fontSize: "3vmax",
            color: "white",
            textShadow: "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black"
          }}
        >
          Winner winner, chicken dinner!
        </h1>
      </Animated>
    </div>
  );
}
