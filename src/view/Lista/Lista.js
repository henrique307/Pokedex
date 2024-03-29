import React, { useEffect, useState } from "react";
import icon from "../assets/loading.svg";
import Pesquisa from "../Pesquisa/Pesquisa";
import { scryRenderedDOMComponentsWithTag } from "react-dom/test-utils";
// import { fetchPokemons } from "../../controller/busca.js";
// import pokedex from "pokedex-promise-v2";
// import getInfo from '../../controller/busca'
import "./index.css";
import types from "./handleTypes";

export default function Lista() {
  const [pokemons, setPokemons] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pesquisa, setPesquisa] = useState();
  const [selectValue, setSelectValue] = useState("Kanto");
  const [noResults, setNoResults] = useState(false);
  const [results, setResults] = useState();

  useEffect(() => {
    fetchPokemons();
  }, [pageNumber]);

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

  async function fetchPokemons() {
    if (pesquisa) {
      searchPokemons();
    }

    let novos = [];

    for (var i = pageNumber * 30; i < pageNumber * 30 + 30; i++) {
      if (!i) continue;

      await fetch(
        results
          ? console.log(results[i])
          : `https://pokeapi.co/api/v2/pokemon/${i}`
      )
        // (results[i].url ? results[i].url : null)
        .then((res) => res.json())
        .then((json) => (json ? novos.push(json) : null));
    }

    if (pesquisa && pageNumber === 0) {
      setPokemons(novos);
    } else {
      setPokemons([...pokemons, ...novos]);
    }
  }

  async function searchPokemons() {
    const expressao = new RegExp(pesquisa, "i");

    await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
      .then((res) => res.json())
      .then((json) =>
        setResults(json.results.filter((poke) => expressao.test(poke.name)))
      );
  }

  // function mostraDetalhes(event) {
  //   console.log(event.target)
  // }

  function checkType(currentType) {
    for (let type in types) {
      if (type === currentType) {
        return types[type];
      }
    }
  }

  if (!pokemons.length) {
    return <div className="loading-page">Carregando...</div>;
  } else {
    return (
      <>
        <Pesquisa setPesquisa={setPesquisa} fetchPokemons={fetchPokemons} />

        <ul className="pokelist">
          {pokemons
            ? pokemons.map((pokemon, index) => {
                return (
                  <li
                    key={index}
                    className={`pokecard ${pokemon.types[0].type.name} `}
                    // onClick={event => mostraDetalhes(event)}
                  >
                    <img src={pokemon.sprites.front_default} />
                    <div className="pokecard-container">
                      <h1>{pokemon.name}</h1>
                      <div className="type-cointainer">
                        {pokemon.types.map((type) => {
                          return (
                            <img
                              className={`types ${type.type.name}-type`}
                              src={checkType(type.type.name)}
                            />
                          );
                        })}
                      </div>
                      <div>ID: {pokemon.id}</div>
                      {/* <div className={``}>{pokemon.types.map(tipo => tipo.type.name + " ")}</div> */}
                    </div>
                  </li>
                );
              })
            : null}
        </ul>
        <div key="justaWard" className={`ward`}>
          <img src={icon} />
        </div>
      </>
    );
  }
}
