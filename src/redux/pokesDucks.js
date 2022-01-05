import axios from "axios"


//constantes

const dataInicial = {

    array: [],
    offset: 0
}


//type
const OBTENER_POKEMONES_EXITO = 'OBTENER_POKEMONES_EXITO'
const SIGUIENTE_POKEMONES_EXITO = 'SIGUIENTE_POKEMONES_EXITO'

//reducers

export default function pokesReducer (state = dataInicial, action) {
    switch (action.type) {
        case OBTENER_POKEMONES_EXITO: 
        return {...state, array: action.payload}
        case SIGUIENTE_POKEMONES_EXITO:
            return {...state, array: action.payload.array, offset: action.payload.offset}
        default:
            return state
    }
//en SIGUIENTE_POKEMONES_EXITO se accede a action.payload y a las dos propiedades que tiene dentro (array: la data que devuelve axios, offset: configurado en offset +20 que es para el paginado)
}
 
//acciones

export const obtenerPokemonesAccion = () => async(dispatch, getState) => {

    // getState recibe el state (dataInicial). Lee la tienda, en la que está pokemones. Y devuelve el objeto pokemones. Para acceder a lo que está dentro de dataInicial, se debe poner.pokemones
    //Para obtener el offset se agrega .offset o con {offset}

    // console.log('getSatte es', getSate().pokemones.offset)
    const {offset} =getState().pokemones
   

     try {
        const res =  await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20
        `)
        dispatch ({
            type: OBTENER_POKEMONES_EXITO,
            payload: res.data.results
        })
//data viene de axios. En el objeto results están los objetos a loe que se quiere acceder
     } catch (error) {
         console.log(error)
     }
}


export const siguientePokemonAccion =() => async(dispatch, getState) => {

    const offset =getState().pokemones.offset
    const siguiente= offset + 20

 try {
     const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${siguiente}&limit=20
     `)



     dispatch ({
         type:  SIGUIENTE_POKEMONES_EXITO,
         payload: {
             array: res.data.results,
             offset: siguiente
         }
     })
 } catch (error) {
     console.log(error)
 }
}