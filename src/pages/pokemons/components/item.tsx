import { useNavigate } from "react-router-dom";
import { Pokemon } from "../../../types";

export function Item({ id, name, imageUrl }: Pokemon) {
  const navigate = useNavigate();

  const gotoDetail = () => {
    navigate(`/pokemons/${id}`);
  };

  return (
    <div
      onClick={gotoDetail}
      className="p-6 shadow-md rounded-sm flex flex-col items-center hover:bg-red-100 hover:cursor-pointer"
    >
      <img src={imageUrl} alt={name} className="max-h-[100px]" />
      <div className="mt-4">{name}</div>
    </div>
  );
}
