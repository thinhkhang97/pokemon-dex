import { Heart, HeartIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Pokemon } from "../../../types";

type Props = {
  pokemon: Pokemon;
  favorited: boolean;
  onFavorite: (id: number, isFavorited: boolean) => void;
};

export function Item({
  pokemon: { id, name, imageUrl },
  favorited,
  onFavorite,
}: Props) {
  const navigate = useNavigate();

  const gotoDetail = () => {
    navigate(`/pokemons/${id}`);
  };

  const _onFavorite = () => {
    onFavorite(id, favorited);
  };

  return (
    <div className="p-6 shadow-md rounded-sm flex flex-col items-center hover:bg-red-100 hover:cursor-pointer relative">
      <img
        onClick={gotoDetail}
        src={imageUrl}
        alt={name}
        className="max-h-[100px]"
      />
      <div className="mt-4">{name}</div>
      <div className="absolute right-4 z-50" onClick={_onFavorite}>
        {favorited ? (
          <Heart size={24} fill="#ef4444" className="text-red-500" />
        ) : (
          <HeartIcon size={24} className="text-red-500" />
        )}
      </div>
    </div>
  );
}
