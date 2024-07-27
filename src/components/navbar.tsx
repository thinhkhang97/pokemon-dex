import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

export function Navbar() {
  const navigate = useNavigate();
  const { favoriteList } = useSelector((state: RootState) => state.pokemons);

  const gotoHome = () => {
    navigate("/");
  };

  const gotoFavorites = () => {
    navigate("/favorites");
  };

  const gotoPokemons = () => {
    navigate("/pokemons");
  };

  const gotoGames = () => {
    navigate("/games");
  };

  return (
    <div className="px-6 bg-red-500 flex justify-between items-center">
      <img
        onClick={gotoHome}
        src={Logo}
        className="w-16 h-16 hover:cursor-pointer"
      />
      <ul className="flex gap-x-4">
        <li
          onClick={gotoPokemons}
          className="text-white hover:text-red-200 hover:cursor-pointer"
        >
          Pokemons
        </li>
        <li
          onClick={gotoFavorites}
          className="text-white hover:text-red-200 hover:cursor-pointer"
        >
          Favorites
          {favoriteList.length > 0 && (
            <span className="text-xs bg-white text-red-500 rounded-full px-2 ml-2">
              {favoriteList.length}
            </span>
          )}
        </li>
        <li
          onClick={gotoGames}
          className="text-white hover:text-red-200 hover:cursor-pointer"
        >
          Games
        </li>
      </ul>
    </div>
  );
}
