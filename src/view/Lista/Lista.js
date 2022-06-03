import React, { useEffect, useState } from 'react';
import {pegaPokemons} from "../../controller/busca.js"
import pokedex from 'pokedex-promise-v2';
// import getInfo from '../../controller/busca'
import './index.css'

export default function Lista() {

    const [allPokemons, setAllPokemons] = useState()
    const [pokemons, setPokemons] = useState()
    const [pesquisa, setPesquisa] = useState()
    const [selectValue, setSelectValue] = useState('Kanto')

    useEffect(() => fetchAllPokemons,[])

    if(!pokemons){
        pegaPokemon()
    }
    
    useEffect(() => {
        if(pokemons){
            const intersectionObserver = new IntersectionObserver((entries) => {
                
                if(entries.some((entrie) => entrie.isIntersecting)){
                    console.log("Estamos Oservando '-' ")
                }else{
                    console.log("tamo vendo nada nn")
                }
    
            })
    
            intersectionObserver.observe(document.querySelector('.ward'))
    
            return () => intersectionObserver.disconnect()    
        }
    })

    // const arrayResult = pokemons.pokemon_species.map(async pokemon => {
    //     await fetch(pokemon.url).then(res => res.json())
    // })
    
    async function fetchAllPokemons() {
        await fetch('https://pokeapi.co/api/v2/pokemon?offset=20&limit=10000')
        .then(res => res.json())
        .then(json => setAllPokemons(json))
    }
    
    async function pegaPokemon() {
        if(allPokemons) {
            const array = [] 
            
            //allPokemons.results.length
            // por enquanto só 20 pokemons serão mostrados, ja que demora muito pra mostrar todos =)
            for(var i=0; i < 30; i++){
                await fetch(allPokemons.results[i].url)
                .then(res => res.json())
                .then(json => array.push(json))
            }
            
            setPokemons(array)
            //`https://pokeapi.co/api/v2/pokemon/${pesquisa}`
        }
    }
    
    if(!pokemons){
        return <div>Carregando...</div>
    } else {
        return (
            <>
                <input 
                placeholder='Barra de pesquisa'
                className='pesquisa-box'
                onChange={(event) => setPesquisa(event.target.value)} />

                <input type='button' value='procura' onClick={pegaPokemon}/>

                <select onChange={event => setSelectValue(event.target.value)}>
                    <option value='kanto'>Kanto</option>
                    <option value='Johto'>Johto</option>
                    <option value='hoenn'>Hoenn</option>
                    <option value='sinnoh'>Sinnoh</option>
                    <option value='unova'>Unova</option>
                    <option value='kalos'>Kalos</option>
                    <option value='alola'>Alola</option>
                    <option value='galar'>Galar</option>
                </select>

                {/* {
                    pokemons.filter(pokemon => )
                } */}

                <ul key={'key'} className='pokelist'>
                    {/*console.log(pokemon)*/}
                    {pokemons ? (
                        pokemons.map((pokemon, index) => {
                            return(
                                <>
                                    <li key={pokemon.name} className='pokecard'>
                                        <h1>{pokemon.name}</h1>
                                        <img src={pokemon.sprites.front_default}/>
                                        <div>ID: {pokemon.id}</div>
                                    </li>
                                </>
                            )
                        })
                        ): null}
                        <li key='justaWard' className='ward'/>
                </ul>
            </>
        )
    }
}