import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Cover } from "@/types";

export type UserState = {
	steamId: string | undefined;
	accessToken: string | undefined;
	includeFamily: boolean | undefined;
	finishedLoading: boolean;
	steamName: string | undefined;
	favorite_covers: { [key: string]: Cover };
};

const initialState: UserState = {
	steamId: undefined,
	accessToken: undefined,
	includeFamily: undefined,
	favorite_covers: {},
	finishedLoading: false,
	steamName: undefined,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setSteamId: (state, action: PayloadAction<string | undefined>) => {
			state.steamId = action.payload;
		},
		setAccessToken: (state, action: PayloadAction<string | undefined>) => {
			state.accessToken = action.payload;
		},
		setIncludeFamily: (state, action: PayloadAction<boolean | undefined>) => {
			state.includeFamily = action.payload;
		},
		resetUser: () => initialState,
		setFavoriteCover: (
			state,
			action: PayloadAction<{ gameUuid: string; cover: Cover }>,
		) => {
			const cover = action.payload.cover;
			const gameUuid = action.payload.gameUuid;
			if (state.favorite_covers[gameUuid]?.uuid === cover.uuid) {
				delete state.favorite_covers[gameUuid];
			} else {
				state.favorite_covers[gameUuid] = cover;
			}
		},
		setFinishedLoading: (state, action: PayloadAction<boolean>) => {
			state.finishedLoading = action.payload;
		},
		clearFavorites: (state) => {
			state.favorite_covers = {};
		},
		setSteamName: (state, action: PayloadAction<string | undefined>) => {
			state.steamName = action.payload;
		},
	},
});

export const {
	setSteamId,
	setAccessToken,
	setIncludeFamily,
	resetUser,
	setFavoriteCover,
	setFinishedLoading,
	setSteamName,
	clearFavorites,
} = userSlice.actions;
export default userSlice.reducer;
