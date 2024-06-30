import { useEffect, useState } from "react";
import { getPokemonDetailByUrl, getPokemons, toPokemon } from "../../apis";
import { Pokemon } from "../../types";
import { List } from "./components/list";

export function PokemonsPage() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getPokemons();
        const promises = data.results.map(async (pokemon) => {
          const pokemonDetail = await getPokemonDetailByUrl(pokemon.url);
          return toPokemon(pokemonDetail);
        });
        const _pokemons: Pokemon[] = await Promise.all(promises);
        _pokemons.sort((p1, p2) => {
          return p1.id - p2.id;
        });
        setPokemons(_pokemons);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      {/* <input type="text" placeholder="Search..." /> */}
      <List data={pokemons} />
    </div>
  );
}
