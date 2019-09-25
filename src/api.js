const base_url = "https://pokeapi.co/api/v2/pokemon/";

export const getRandomPokemon = async () => {
  const response = await fetch(base_url + Math.ceil(Math.random() * 151));
  const data = await response.json();
  console.log(data);
  return data;
};

export const getPokemon = async name => {
  const response = await fetch(base_url + name);
  const data = await response.json();
  return data;
};
