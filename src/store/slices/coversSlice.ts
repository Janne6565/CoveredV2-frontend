import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Cover } from "@/types";

type CoversState = {
  coversForGame: { [key: string]: { [key: string]: Cover } };
};

const initialState: CoversState = {
  coversForGame: {}
};

const coversSlice = createSlice({
  name: "covers",
  initialState,
  reducers: {
    setCovers: (state, action: PayloadAction<Cover[]>) => {
      state.coversForGame = {};
      state.coversForGame = action.payload.reduce((acc, cover) => {
        if (!acc[cover.game_uuid]) {
          acc[cover.game_uuid] = {};
        }
        acc[cover.game_uuid][cover.uuid] = cover;
        return (
          acc
        );
      }, {} as { [key: string]: { [key: string]: Cover } });
    },
    addCover: (state, action: PayloadAction<Cover>) => {
      if (!state.coversForGame[action.payload.game_uuid]) {
        state.coversForGame[action.payload.game_uuid] = {};
      }
      state.coversForGame[action.payload.game_uuid][action.payload.uuid] = action.payload;
    }
  }
});

export const { setCovers, addCover } =
  coversSlice.actions;
export default coversSlice.reducer;
