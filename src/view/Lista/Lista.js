import React, { useEffect, useState } from "react";
import icon from '../assets/loading.svg'
import { scryRenderedDOMComponentsWithTag } from "react-dom/test-utils";
// import { pegaPokemons } from "../../controller/busca.js";
// import pokedex from "pokedex-promise-v2";
// import getInfo from '../../controller/busca'
import "./index.css";

export default function Lista() {
  const [pokemonsInPage, setPokemonsInPage] = useState();
  const [pokemons, setPokemons] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pesquisa, setPesquisa] = useState();
  const [selectValue, setSelectValue] = useState("Kanto");

  useEffect(() => {fetchPokemonsInPage()}, [pageNumber]);

  useEffect(() => {pegaPokemons()}, [pokemonsInPage]);

  useEffect(() => {
    if (pokemons.length) {
        const intersectionObserver = new IntersectionObserver((entries) => {
        if (entries.some((entrie) => entrie.isIntersecting)) {
          setPageNumber(pageNumberInsideState => pageNumberInsideState + 1)
        }
      });

      intersectionObserver.observe(document.querySelector(".ward"));

      return () => intersectionObserver.disconnect();
    }
  }, [pokemons]);

  async function fetchPokemonsInPage() {
    await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${pageNumber * 30}&limit=${30}`)
    .then((res) => res.json())
    .then((newPokemons) => setPokemonsInPage(newPokemons))
  }

  async function pegaPokemons() {
    if (pokemonsInPage) {
      const novos = [];
      
      for (var i = 0; i < 30; i++) {
        await fetch(pokemonsInPage.results[i].url)
        .then((res) => res.json())
        .then((json) => novos.push(json));
      }
      
      const antigos = pokemons
      
      setPokemons([...antigos, ...novos]);
      //`https://pokeapi.co/api/v2/pokemon/${pesquisa}`
    }
}

if (!pokemons.length) {
    return <div>Carregando...</div>;
} else {
    return (
        <>
        <input
          placeholder="Barra de pesquisa"
          className="pesquisa-box"
          onChange={(event) => setPesquisa(event.target.value)}
        />

        <input type="button" value="procura" onClick={pegaPokemons} />

        <select onChange={(event) => setSelectValue(event.target.value)}>
          <option value="kanto">Kanto</option>
          <option value="Johto">Johto</option>
          <option value="hoenn">Hoenn</option>
          <option value="sinnoh">Sinnoh</option>
          <option value="unova">Unova</option>
          <option value="kalos">Kalos</option>
          <option value="alola">Alola</option>
          <option value="galar">Galar</option>
        </select>

        <ul key={"key"} className="pokelist">
          {/*console.log(pokemon)*/}
          {pokemons ? pokemons.map((pokemon, index) => {
                return (
                  <>
                    <li key={pokemon.name} className="pokecard">
                      <h1>{pokemon.name}</h1>
                      <img src={pokemon.sprites.front_default} />
                      <div>ID: {pokemon.id}</div>
                      <div>{pokemon.types[0].type.name}</div>
                    </li>
                  </>
                );
              })
            : null}
        </ul>
          <div key="justaWard" className="ward">
            <img src={icon}/>
          </div>
      </>
    );
  }
}
