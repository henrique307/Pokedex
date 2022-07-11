// async function buscaUrls() { //mudar opções de gen's depois

//     return await fetch(`https://pokeapi.co/api/v2/generation/1/`)
//       .then(res => res.json())
//       .then(json => json.pokemon_species)

// }

async function pegaPokemons() {
  try {
    const res = fetch("https://pokeapi.co/api/v2/pokemon/ditto");
    console.log((await res).json());
    //return (await res).json()
  } catch (err) {
    console.log(`erro: ${err}`);
  }
}

export { pegaPokemons };
