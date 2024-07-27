import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PokemonState {
  favoriteList: number[];
}

const initialState: PokemonState = {
  favoriteList: [],
};

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<number>) => {
      state.favoriteList.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favoriteList = state.favoriteList.filter(
        (pokemon) => pokemon !== action.payload
      );
    },
  },
});

export const { addFavorite, removeFavorite } = pokemonSlice.actions;

export default pokemonSlice.reducer;
