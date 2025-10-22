import apiClient from "@/api/apiClient.ts";
import type { Cover, Game } from "@/types";

const loadSteamId = async (vanityUrl: string) => {
	return (await apiClient.get("/util/steam/resolve-vanity-url/" + vanityUrl))
		.data as { steamid: string };
};

const loadGamesFromFamily = async (steamId: string, accessToken: string) => {
	return (
		await apiClient.get("/games/family/" + steamId + "?token=" + accessToken)
	).data as Game[];
};

const loadGamesFromPlayer = async (steamId: string) => {
	return (await apiClient.get("/games/player/" + steamId)).data as Game[];
};

const fetchCoversFromGames = async (gameUuids: string[]) => {
	return (await apiClient.post("/covers/games", gameUuids)).data as Cover[];
};

const exportCovers = async (coverUuids: string[]) => {
	return await apiClient.post("/covers/export", coverUuids, {
		responseType: "blob",
	});
};

const loadSteamNameFromId = async (steamId: string) => {
	return (await apiClient.get("/util/steam/username/" + steamId))
		.data as string;
};

export {
	loadSteamId,
	loadGamesFromFamily,
	loadGamesFromPlayer,
	fetchCoversFromGames,
	exportCovers,
	loadSteamNameFromId,
};
