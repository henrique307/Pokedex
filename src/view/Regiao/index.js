import React from 'react';
import './index.css'

export default function Regiao({setSelectValue}){
    return(
        
            <select onChange={(event) => setSelectValue(event.target.value)}>
                <option value="kanto">Todos</option>
                <option value="kanto">Kanto</option>
                <option value="Johto">Johto</option>
                <option value="hoenn">Hoenn</option>
                <option value="sinnoh">Sinnoh</option>
                <option value="unova">Unova</option>
                <option value="kalos">Kalos</option>
                <option value="alola">Alola</option>
                <option value="galar">Galar</option>
            </select>
        
    )
}