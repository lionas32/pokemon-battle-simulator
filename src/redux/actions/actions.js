export const attackPokemonRight = damage => ({
  type: "ATTACK_POKEMON_RIGHT",
  payload: {
    damage
  }
});

export const attackPokemonLeft = damage => ({
  type: "ATTACK_POKEMON_LEFT",
  payload: {
    damage
  }
});
export const setPokemonAliveLeft = alive => ({
  type: "SET_POKEMON_ALIVE_LEFT",
  payload: {
    alive
  }
});

export const setPokemonAliveRight = alive => ({
  type: "SET_POKEMON_ALIVE_RIGHT",
  payload: {
    alive
  }
});

export const changeTurn = side => ({
  type: "CHANGE_TURN",
  payload: {
    side
  }
});

export const changePokemon = index => ({
  type: "CHANGE_POKEMON",
  payload: {
    index
  }
});

export const changeHpLeft = hp => ({
  type: "CHANGE_HP_LEFT",
  payload: {
    hp
  }
});
