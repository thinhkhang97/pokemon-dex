import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  HomePage,
  FavoritesPage,
  PokemonsPage,
  NotFound,
  PokemonPage,
  Games,
} from "./pages";
import MainLayout from "./pages/layout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/pokemons" element={<PokemonsPage />} />
          <Route path="/pokemons/:id" element={<PokemonPage />} />
          <Route path="/games" element={<Games />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
