import { createStore } from "redux";
import pokemonReducer from "./reducers/pokemonReducer";

export default createStore(
  pokemonReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
