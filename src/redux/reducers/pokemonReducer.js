export default function pokemonReducer(
  state = {
    hpLeft: 100,
    hpRight: 100,
    damageDoneLeft: 0,
    aliveLeft: true,
    aliveRight: true,
    side: "left",
    index: 0
  },
  action
) {
  switch (action.type) {
    case "ATTACK_POKEMON_LEFT":
      return {
        ...state,
        hpLeft: state.hpLeft - action.payload.damage,
        damageDoneLeft: action.payload.damage
      };
    case "ATTACK_POKEMON_RIGHT":
      return {
        ...state,
        hpRight: state.hpRight - action.payload.damage
      };
    case "SET_POKEMON_ALIVE_LEFT":
      return {
        ...state,
        aliveLeft: action.payload.alive
      };
    case "SET_POKEMON_ALIVE_RIGHT":
      return {
        ...state,
        aliveRight: action.payload.alive
      };
    case "CHANGE_TURN":
      return {
        ...state,
        side: action.payload.side
      };
    case "CHANGE_POKEMON":
      return {
        ...state,
        index: action.payload.index
      };
    case "CHANGE_HP_LEFT":
      return {
        ...state,
        hpLeft: action.payload.hp
      };
    default:
      return state;
  }
}
