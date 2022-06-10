import React from 'react';
import './index.css'

export default function Pesquisa({setPesquisa, pegaPokemons}) {
    return (
        <div className='pesquisa'>
            <input
            variant="standart"
            placeholder="Barra de pesquisa"
            className="pesquisa-field"
            onChange={(event) => setPesquisa(event.target.value)}
            />
            <input type="button" value="Pesquisar!" onClick={pegaPokemons} className="pesquisa-buttom"/>
            {/* <label class="switch">
                <label class="label">Pesquisa Avançada</label>
                <input type="checkbox"/>
                <span class="slider round"/>
            </label> */}
        </div>
    )
}