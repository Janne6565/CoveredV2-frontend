import apiClient from "@/api/apiClient.ts";
import type { Game } from "@/types";

const loadSteamId = async (vanityUrl: string) => {
  return (await apiClient.get("/util/steam/resolve-vanity-url/" + vanityUrl)).data;
};

const loadGamesFromFamily = async (steamId: string, accessToken: string) => {
  return (await apiClient.get("/games/family/" + steamId + "?token=" + accessToken)).data as Game[];
};

const loadGamesFromPlayer = async (steamId: string) => {
  console.log("loading games from player");
  return (await apiClient.get("/games/player/" + steamId)).data as Game[];
};

export { loadSteamId, loadGamesFromFamily, loadGamesFromPlayer };