import { Pokemon } from "../../../types";
import { Item } from "./item";

interface ListProps {
  data: Pokemon[];
  favoriteList: number[];
  onFavorite: (id: number, isFavorited: boolean) => void;
}

export function List({ data, favoriteList, onFavorite }: ListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {data.map((pokemonData) => {
        return (
          <Item
            favorited={favoriteList.includes(pokemonData.id)}
            key={pokemonData.id}
            pokemon={pokemonData}
            onFavorite={onFavorite}
          />
        );
      })}
    </div>
  );
}
