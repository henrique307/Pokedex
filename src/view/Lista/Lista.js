import React, { useEffect, useState } from 'react';
import {pegaPokemons} from "../../controller/busca.js"
import pokedex from 'pokedex-promise-v2';
// import getInfo from '../../controller/busca'
import './index.css'

export default function Lista() {

    const [allPokemons, setAllPokemons] = useState()
    const [pokemon, setPokemon] = useState()
    const [pesquisa, setPesquisa] = useState()

    useEffect(() => fetchAllPokemons,[])

    // const arrayResult = pokemons.pokemon_species.map(async pokemon => {
    //     await fetch(pokemon.url).then(res => res.json())
    // })

    async function fetchAllPokemons() {
        await fetch('https://pokeapi.co/api/v2/pokemon?offset=20&limit=10000')
         .then(res => res.json())
         .then(json => setAllPokemons(json))
    }

    async function pegaPokemon() {

        const array = [] 

        //allPokemons.results.length
        // por enquanto só 20 pokemons serão mostrados, ja que demora muito pra mostrar todos =)
        for(var i=0; i < 20; i++){
            await fetch(allPokemons.results[i].url)
            .then(res => res.json())
            .then(json => array.push(json))
        }

        setPokemon(array)
        //`https://pokeapi.co/api/v2/pokemon/${pesquisa}`
    }
    
    return (
        <>
            <input 
              placeholder='Barra de pesquisa'
              className='pesquisa-box'
              onChange={(event) => setPesquisa(event.target.value)} />

            <input type='button' value='procura' onClick={pegaPokemon}/>

            <ul className='pokelist'>
                {console.log(pokemon)}
                {pokemon ? (
                    pokemon.map((esse, index) => {
                        return(
                            <li key={index} className='pokecard'>
                                <h1>{esse.name}</h1>
                                <img src={esse.sprites.front_default}/>
                                <div>ID: {esse.id}</div>
                            </li>
                        )
                    })
                ): null}
            </ul>
        </>
    )
}