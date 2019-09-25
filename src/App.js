import React from "react";
import Modal from "react-modal";
import styles from "./app.module.css";
import PokemonContainerLeft from "./PokemonContainerLeft";
import PokemonContainerRight from "./PokemonContainerRight";

function App() {
  const [openModal, setOpenModal] = React.useState(true);

  const style = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    },
    content: {
      position: "fixed",
      top: "10%",
      left: "10%",
      right: "10%",
      bottom: "30%",
      backgroundColor: "lightblue"
    }
  };

  return (
    <div className={styles.App}>
      <Modal isOpen={openModal} style={style} ariaHideApp={false}>
        <div className={styles.ModalContainer}>
          <h1>Welcome!</h1>
          <div className={styles.Intro}>
            <p>
              This is a very simple turn-based pokemon battle simulator. Press{" "}
              <strong>Space</strong> to attack the Pokemon on the opposing side!
              <br />
              (On mobile you can tap on your pokemon to attack!)
            </p>
            <p>
              After you press the <em>Start</em> button, you will receive three
              random pokemon. You can switch between them at any time.
            </p>
            <p>Try your best to defeat the opposing Pokemon!</p>
          </div>
          <div
            className={styles.StartButton}
            onClick={() => setOpenModal(false)}
          >
            <p>Press here to start!</p>
          </div>
        </div>
      </Modal>
      <header className={styles.AppHeader}>
        <p className={styles.HeaderColor}>Pokémon Battle Simulator</p>
      </header>
      {openModal ? null : (
        <main className={styles.Main}>
          <div className={styles.PokemonContainer}>
            <PokemonContainerLeft />
          </div>
          <div className={styles.PokemonContainer}>
            <PokemonContainerRight />
          </div>
        </main>
      )}
    </div>
  );
}

export default App;
