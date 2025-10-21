import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/store/store.ts";
import { loadGamesFromFamily, loadGamesFromPlayer } from "@/api/apiService.ts";
import ProgressAnimation from "@/components/ProgressAnimation.tsx";

const GameView = (props: { visible: boolean }) => {
  const userPreferences = useAppSelector((state) => state.user);

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
    className={""}>

    {isLoading ? <div className="flex flex-col items-center justify-center">
        <ProgressAnimation progress={100} />
        <span>Loading your Games...</span>
      </div> :
      games?.map((game) => (
        <div key={game.game.uuid} className="flex flex-col items-center justify-center">{game.game.uuid}</div>
      ))
    }
  </div>;
};

export default GameView;