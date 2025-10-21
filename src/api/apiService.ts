import apiClient from "@/api/apiClient.ts";
import type { Cover, Game } from "@/types";

const loadSteamId = async (vanityUrl: string) => {
  return (await apiClient.get("/util/steam/resolve-vanity-url/" + vanityUrl)).data;
};

const loadGamesFromFamily = async (steamId: string, accessToken: string) => {
  return (await apiClient.get("/games/family/" + steamId + "?token=" + accessToken)).data as Game[];
};

const loadGamesFromPlayer = async (steamId: string) => {
  return (await apiClient.get("/games/player/" + steamId)).data as Game[];
};

const fetchCoversFromGames = async (gameUuids: string[]) => {
  return (await apiClient.post("/covers/games", gameUuids)).data as Cover[];
};

export { loadSteamId, loadGamesFromFamily, loadGamesFromPlayer, fetchCoversFromGames };