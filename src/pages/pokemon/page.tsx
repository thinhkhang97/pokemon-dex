import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPokemonDetail, toPokemon } from "../../apis";
import { Pokemon } from "../../types";

export function PokemonPage() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState<Pokemon | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      const data = await getPokemonDetail(id);
      setPokemon(toPokemon(data));
    };

    fetchData();
  }, []);

  return <div>{JSON.stringify(pokemon)}</div>;
}
