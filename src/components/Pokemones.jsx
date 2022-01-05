import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {obtenerPokemonesAccion, siguientePokemonAccion} from '../redux/pokesDucks'

const Pokemones = () => {

    const dispatch = useDispatch()
    const pokemones = useSelector(store => store.pokemones.array)
    console.log(pokemones)

    return (
        <div>
            <h1>Lista de pokemones</h1>
            <ul>
                {
                    pokemones.map((item, index)=> (
                        <li key={index}>{item.name}</li>
                    ))
                //se puede usar item.name de key porque en este caso es único. Yo lo cambié por index 
                }
            </ul>
           
            <button onClick={()=> dispatch(obtenerPokemonesAccion())}>Get Pokemones</button>
            <button onClick={() => dispatch(siguientePokemonAccion())}>Next pokemon</button>
        </div>
    )
}

export default Pokemones
