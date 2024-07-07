import { useEffect, useRef, useState } from "react";
import { getPokemonDetailByUrl, getPokemons, toPokemon } from "../../apis";
import { Pokemon } from "../../types";
import { List } from "./components/list";

export function PokemonsPage() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const offset = useRef(0);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getPokemons(offset.current);
      const promises = data.results.map(async (result) => {
        const detail = await getPokemonDetailByUrl(result.url);
        return toPokemon(detail);
      });
      const _pokemons = await Promise.all(promises);
      setPokemons((prev) => [...prev, ..._pokemons]);
      if (_pokemons.length === 20) {
        offset.current += 20;
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (loading) return;

      if (
        window.scrollY >
        document.body.scrollHeight - window.innerHeight - 300
      ) {
        fetchData();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading]);

  return (
    <div className="p-6" id="view">
      <List data={pokemons} />
    </div>
  );
}
