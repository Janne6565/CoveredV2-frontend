import apiClient from "@/api/apiClient.ts";

const loadSteamId = async (vanityUrl: string) => {
  return (await apiClient.get("/util/steam/resolve-vanity-url/" + vanityUrl)).data;
};

export { loadSteamId };