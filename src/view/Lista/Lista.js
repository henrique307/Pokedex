import React, { useEffect, useState } from "react";
import icon from "../assets/loading.svg";
import Pesquisa from "../Pesquisa/Pesquisa";
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

  useEffect(() => {
    fetchPokemonsInPage();
  }, [pageNumber]);

  useEffect(() => {
    pegaPokemons();
  }, [pokemonsInPage]);

  useEffect(() => {
    if (pokemons.length) {
      const intersectionObserver = new IntersectionObserver((entries) => {
        if (entries.some((entrie) => entrie.isIntersecting)) {
          setPageNumber((pageNumberInsideState) => pageNumberInsideState + 1);
        }
      });

      intersectionObserver.observe(document.querySelector(".ward"));

      return () => intersectionObserver.disconnect();
    }
  }, [pokemons]);

  async function fetchPokemonsInPage() {
    await fetch(
      `https://pokeapi.co/api/v2/pokemon/?offset=${pageNumber * 30}&limit=${30}`
    )
      .then((res) => res.json())
      .then((newPokemons) => setPokemonsInPage(newPokemons));
  }

  async function pegaPokemons() {
    if (pokemonsInPage) {
      const novos = [];

      for (var i = 0; i < 30; i++) {
        await fetch(pokemonsInPage.results[i].url)
          .then((res) => res.json())
          .then((json) => novos.push(json));
      }

      const antigos = pokemons;

      setPokemons([...antigos, ...novos]);
      //`https://pokeapi.co/api/v2/pokemon/${pesquisa}`
    }
  }

  function mostraDetalhes(event) {
    console.log(event)
  }

  if (!pokemons.length) {
    return <div>Carregando...</div>;
  } else {
    return (
      <>
        <Pesquisa setPesquisa={setPesquisa} pegaPokemons={pegaPokemons}/>

        <ul key={"key"} className="pokelist">
          {/*console.log(pokemon)*/}
          {pokemons
            ? pokemons.map((pokemon, index) => {
                return (
                    <li
                      key={pokemon.id}
                      className={`pokecard ${pokemon.types[0].type.name} `}
                      onClick={event => mostraDetalhes(event)}
                    >
                      <img src={pokemon.sprites.front_default} />
                      <div className="pokecard-container">
                          <h1>{pokemon.name}</h1>
                          <div>ID: {pokemon.id}</div>
                          <div>{pokemon.types.map(tipo => tipo.type.name + " ")}</div>
                      </div>
                    </li>
                );
              })
            : null}
        </ul>
        <div key="justaWard" className="ward">
          <img src={icon} />
        </div>
      </>
    );
  }
}
