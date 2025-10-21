import { useQuery } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "@/store/store.ts";
import { loadGamesFromFamily, loadGamesFromPlayer } from "@/api/apiService.ts";
import { Button } from "@/components/ui/button.tsx";
import { setAccessToken, setIncludeFamily } from "@/store/slices/userSetupSlice.ts";

const GameView = (props: { visible: boolean }) => {
  const userPreferences = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const { isLoading, data: games } = useQuery({
    queryKey: ["loadGames", userPreferences.steamId],
    queryFn: async () => {
      if (!userPreferences.steamId) throw Error("no steam id");
      if (userPreferences.includeFamily && !userPreferences.accessToken) throw Error("bad config");
      const games = userPreferences.includeFamily ? await loadGamesFromFamily(userPreferences.steamId, userPreferences.accessToken!) : await loadGamesFromPlayer(userPreferences.steamId);
      for (const game of games) {
        if (game.game.time_of_last_cover_fetch == null) {
          throw Error("still_loading");
        }
      }
      return games;
    },
    enabled: props.visible,
    retry: true
  });

  return <div
    className={"flex flex-col items-center justify-center max-w-[95vw] w-[900px] animate-[height] min-h-[" + (props.visible ? "40vh" : "0vh") + "]"}>
    <Button onClick={() => {
      dispatch(setIncludeFamily(undefined));
      dispatch(setAccessToken(undefined));
    }}>Setup</Button>
    {isLoading && <div>Loading...</div>}
    {games?.map((game) => (
      <div key={game.game.uuid} className="flex flex-col items-center justify-center">{game.game.uuid}</div>
    ))}
  </div>;
};

export default GameView;