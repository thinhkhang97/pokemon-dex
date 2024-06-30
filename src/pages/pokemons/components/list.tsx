import { Pokemon } from "../../../types";
import { Item } from "./item";

interface ListProps {
  data: Pokemon[];
}

export function List({ data }: ListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {data.map((pokemonData) => {
        return (
          <Item
            key={pokemonData.id}
            name={pokemonData.name}
            imageUrl={pokemonData.imageUrl}
            id={pokemonData.id}
          />
        );
      })}
    </div>
  );
}
