import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Game } from "@/types";

type GamesState = {
  games: { [key: string]: Game };
};

const initialState: GamesState = {
  games: {}
};

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    setGames: (state, action: PayloadAction<Game[]>) => {
      state.games = {};
      state.games = action.payload.reduce((acc, game) => {
        return { [game.game.uuid]: game, ...acc };
      }, {} as { [key: string]: Game });
    },
    addGame: (state, action: PayloadAction<Game>) => {
      state.games[action.payload.game.uuid] = action.payload;
    }
  }
});

export const { setGames, addGame } =
  gamesSlice.actions;
export default gamesSlice.reducer;
