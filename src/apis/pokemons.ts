import axios from "axios";
import { Pokemon } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

interface PokemonsList {
  results: {
    name: string;
    url: string;
  }[];
}

export async function getPokemons(): Promise<PokemonsList> {
  const response = await axios.get(`${API_URL}/pokemon?limit=100&offset=0`);
  return response.data;
}

interface PokemonDetail {
  id: string;
  name: string;
  sprites: {
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
}

export async function getPokemonDetail(id: string): Promise<PokemonDetail> {
  const response = await axios.get(`${API_URL}/pokemon/${id}`);
  return response.data;
}

export async function getPokemonDetailByUrl(
  url: string
): Promise<PokemonDetail> {
  const response = await axios.get(url);
  return response.data;
}

export function toPokemon(data: PokemonDetail): Pokemon {
  return {
    id: data.id,
    name: data.name,
    imageUrl: data.sprites.other.dream_world.front_default,
  };
}
