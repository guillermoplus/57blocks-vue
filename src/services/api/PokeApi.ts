import axios, {type AxiosResponse} from "axios";
import type PaginationResult from "@/models/api/PaginationResult";
import type Pokemon from "@/models/api/Pokemon";

class PokeApi {
    private static baseUrl: string = 'https://pokeapi.co/api/v2/';

    static index(limit: number = 20, offset: number = 0): Promise<AxiosResponse<PaginationResult>> {
        const endpoint = `pokemon?limit=${limit}&offset=${offset}`;
        return axios.get(this.baseUrl + endpoint);
    }

    static getPokemon(name: string): Promise<AxiosResponse<Pokemon>> {
        const endpoint = `pokemon/${name}`;
        return axios.get(this.baseUrl + endpoint);
    }
}

export default PokeApi;