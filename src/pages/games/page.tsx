import { useEffect, useRef, useState } from "react";
import { Pokemon } from "../../types";
import { getPokemonDetailByUrl, getPokemons } from "../../apis";
import { shuffle } from "lodash";
import { Card } from "./components/card";

const WIDTH = 8;
const HEIGHT = 8;

/**
 * @issues
 * 1. Wrong types
 * 2. After select pokemon, we need to wait 2s to open new cell
 * 3. Layout of the game is not center
 * @features
 * 1. Calculate score, after select the same pokemons, user gets 10 score
 * 2. Place a background, after select the same pokemon, please hide them to see the background
 */

export const Games = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [reveals, setReveals] = useState<number[]>([]);
  const [tempReveal, setTempReveal] = useState<number[]>([]);
  const isTempRevealing = useRef(false);

  useEffect(() => {
    if (tempReveal.length === 2) {
      setTimeout(() => {
        const firstSelection = tempReveal[0];
        const secondSelection = tempReveal[1];

        if (pokemons[firstSelection].id === pokemons[secondSelection].id) {
          setReveals((prev) => [...prev, firstSelection, secondSelection]);
        }
        setTempReveal([]);
        isTempRevealing.current = false;
      }, 2000);
    }
  }, [pokemons, tempReveal]);

  useEffect(() => {
    const fetchData = async () => {
      const pokemonUrls = await getPokemons(0, (WIDTH * HEIGHT) / 4);
      const pokemonDetails = await Promise.all(
        pokemonUrls.results.map(async (item) => {
          return await getPokemonDetailByUrl(item.url);
        })
      );
      const _pokemons = pokemonDetails.map((item) => ({
        name: item.name,
        id: item.id,
        imageUrl: item.sprites.other.dream_world.front_default,
      }));
      setPokemons(
        shuffle([..._pokemons, ..._pokemons, ..._pokemons, ..._pokemons])
      );
    };

    fetchData();
  }, []);

  const handleClick = (index: number) => {
    if (isTempRevealing.current) return;

    if (tempReveal.length === 0) {
      setTempReveal([index]);
      return;
    }
    if (tempReveal.length === 1) {
      isTempRevealing.current = true;
      setTempReveal((prev) => [...prev, index]);
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-[70%]">
        <div
          className={`grid gap-2`}
          style={{
            gridTemplateColumns: `repeat(${WIDTH}, minmax(16px, 80px))`,
          }}
        >
          {pokemons.map((item, index) => {
            return (
              <Card
                isReveal={tempReveal.includes(index) || reveals.includes(index)}
                onClick={handleClick}
                key={item.id}
                id={index}
                imageUrl={item.imageUrl}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
