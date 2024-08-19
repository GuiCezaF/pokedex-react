import axios from "axios";
import React, { useEffect, useState } from "react";
import { getBackgroundColor } from "./backgroundColor";
import "./style.css"
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';

interface Pokemon {
  id: number;
  name: string;
  types: { type: { name: string } }[];
  sprites: { front_default: string };
}

interface Pokemons {
  name: string;
  url: string;
}

async function getAllPokemons(url: string): Promise<Pokemons[]> {
  try {
    const response = await axios.get(url);
    return response.data.results;
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function getPokemon(url: string): Promise<Pokemon[]> {
  try {
    const data = await getAllPokemons(url);
    const pokePromises = data.map(async (pokemon: Pokemons) => {
      const pokeUrl = pokemon.url;
      try {
        const response = await axios.get(pokeUrl);
        return response.data as Pokemon;
      } catch (err) {
        console.error(`Erro ao buscar detalhes do Pokémon: ${err}`);
        return null;
      }
    });

    const pokes = await Promise.all(pokePromises);
    return pokes.filter((pokemon): pokemon is Pokemon => pokemon !== null);
  } catch (error) {
    console.error("Erro ao buscar a lista de Pokémons:", error);
    return [];
  }
}

const PokemonList: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const url = "https://pokeapi.co/api/v2/pokemon?limit=151";
    const fetchPokemons = async () => {
      setLoading(true);
      const data = await getPokemon(url);
      setPokemons(data);
      setLoading(false);
    };
    fetchPokemons();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin"><RefreshRoundedIcon/></div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-5 gap-4">
        {pokemons.map((pokemon) => (
          <div
            key={pokemon.id}
            className="flex flex-col items-center m-5 p-5 rounded-md"
            style={{ backgroundColor: getBackgroundColor(pokemon.types[0].type.name), border:"1px solid #ccc" }}
          >
            <h2>{pokemon.name}</h2>
            <span># {pokemon.id}</span>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p>Tipos: {pokemon.types.map((t) => t.type.name).join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
