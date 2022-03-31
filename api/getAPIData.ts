import { PokeData } from "../interfaces";

export const getAPIData = async (url: string)  => {

    try {
        const apiResponse = await fetch(url);
        const data = await apiResponse.json();
        
        return data

    } catch (error) {
        console.log(error)
    }
};