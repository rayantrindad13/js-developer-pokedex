const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = {
    number: pokeDetail.id,
    name: pokeDetail.name,
    types: pokeDetail.types.map((typeSlot) => typeSlot.type.name),
    type: pokeDetail.types[0].type.name,
    photo: pokeDetail.sprites.front_default,
    height: pokeDetail.height,
    weight: pokeDetail.weight,
    abilities: pokeDetail.abilities.map((ab) => ab.ability.name),
  };

  return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon);
};

pokeApi.getPokemons = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails);
};
