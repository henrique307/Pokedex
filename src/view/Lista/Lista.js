import React from 'react';
import './index.css'

const lis = []

for(let i=0;i<100;i++){
    lis.push(`pokemon ${i + 1}`)
}

export default function Lista() {

    return (
        <ul className='pokelist'>
            {
                lis.map(comp => <li className='pokecard'>{comp}</li>)
            }
        </ul>
    )
}