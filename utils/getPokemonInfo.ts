import { getAPIData } from "../api"
import { PokemonFull } from "../interfaces"



export const getPokemonInfo = async (nameOrId: string) => {


    try {
        const data: PokemonFull = await getAPIData(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`)

        return {
            id: data.id,
            name: data.name,
            sprites: data.sprites
        }
    } catch (error) {
        return null
    }


}