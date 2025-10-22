import { useQuery } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "@/store/store.ts";
import { fetchCoversFromGames, loadGamesFromFamily, loadGamesFromPlayer } from "@/api/apiService.ts";
import ProgressAnimation from "@/components/ProgressAnimation.tsx";
import { setGames } from "@/store/slices/gamesSlice.ts";
import { useMemo, useState } from "react";
import { setCovers } from "@/store/slices/coversSlice.ts";
import { useCurrentLocation } from "@/hooks/useCurrentLocation.ts";
import { fuzzyMatchWithScore, normalizeTimeToMinutes } from "@/lib/utils.ts";
import PageControl from "@/features/GameView/PageControl/PageControl.tsx";
import GameCard from "@/features/GameView/GameCard/GameCard.tsx";
import GameCoverModal from "@/features/GameView/GameCoverModal/GameCoverModal.tsx";
import ExportModal from "@/features/GameView/ExportModal/ExportModal.tsx";

const GameView = (props: { visible: boolean }) => {
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");
  const userPreferences = useAppSelector((state) => state.user);
  const games = useAppSelector(state => state.games.games);
  const covers = useAppSelector(state => state.covers.coversForGame);
  const [missingGames, setMissingGames] = useState<number | null>(null);
  const [totalGames, setTotalGames] = useState<number | null>(null);
  const [openGame, setOpenGame] = useState<string | null>(null);

  const filteredAndSortedGames = useMemo(() => {
    let filtered = Object.values(games);
    if (searchTerm.trim()) {
      filtered = filtered
        .map(game => ({
          game,
          score: fuzzyMatchWithScore(searchTerm, game.game.name)
        }))
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .map(item => item.game);
    } else {
      // Sort by playtime when no search term
      filtered = [...filtered].sort((a, b) => b.playtime - a.playtime);
    }

    return filtered;
  }, [games, searchTerm]);

  const dispatch = useAppDispatch();
  const { pathname } = useCurrentLocation();
  const currentPageNumber = useMemo(() => {
    const page = parseInt(pathname.split("/").pop() ?? "-1");
    if (!isNaN(page)) {
      return page;
    }
    window.history.replaceState({}, "", "/1");
    return 1;
  }, [pathname]);

  const maxPage = Math.ceil(filteredAndSortedGames.length / itemsPerPage) || 1;

  const currentPage = useMemo(() => filteredAndSortedGames.slice((currentPageNumber - 1) * itemsPerPage, currentPageNumber * itemsPerPage), [filteredAndSortedGames, currentPageNumber, itemsPerPage]);

  const handlePageChange = (page: number) => {
    window.history.pushState({}, "", `/${page}`);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    // Reset to page 1 when changing items per page
    if (currentPageNumber !== 1) {
      handlePageChange(1);
    }
  };

  const handleSearchChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
    // Reset to page 1 when searching
    if (currentPageNumber !== 1) {
      handlePageChange(1);
    }
  };

  const { isLoading } = useQuery({
    queryKey: ["loadGames", userPreferences.steamId],
    queryFn: async () => {
      if (!userPreferences.steamId) throw Error("no steam id");
      if (userPreferences.includeFamily && !userPreferences.accessToken) throw Error("bad config");
      const games = userPreferences.includeFamily ? await loadGamesFromFamily(userPreferences.steamId, userPreferences.accessToken!) : await loadGamesFromPlayer(userPreferences.steamId);
      setTotalGames(games.length);
      let countNotLoadedGames = 0;
      for (const game of games) {
        if (game.game.time_of_last_cover_fetch == null) {
          countNotLoadedGames++;
        }
      }
      setMissingGames(countNotLoadedGames);
      if (countNotLoadedGames > 0) {
        throw Error("still_loading");
      }
      dispatch(setGames(games));
      return games;
    },
    enabled: props.visible && Object.keys(games).length === 0,
    retry: true,
    retryDelay: 200,
    refetchIntervalInBackground: true
  });

  const { isLoading: isCoversLoading } = useQuery({
    queryKey: ["loadCovers", games],
    queryFn: async () => {
      const covers = await fetchCoversFromGames(Object.values(games).map(game => game.game.uuid));
      dispatch(setCovers(covers));
      return covers;
    },
    enabled: props.visible && Object.keys(games).length > 0 && Object.keys(covers).length === 0,
    retry: true
  });

  return <div className={"min-w-[60%] flex flex-col gap-6"}>
    {(isLoading || isCoversLoading || (filteredAndSortedGames.length === 0 && Object.keys(games).length === 0)) ? (
      <div className="flex flex-col items-center justify-center h-[25vh] gap-6">
        <ProgressAnimation
          progress={(missingGames !== null && totalGames !== null) ? ((totalGames - missingGames) / totalGames) * 100 : 0} />
        <span
          className={"text-gray-400 text-center"}
        >
          Loading your Games... ({totalGames !== null && missingGames !== null ? totalGames - missingGames : "-"}/{totalGames}) <br />
          Approximate time remaining: {missingGames !== null ? normalizeTimeToMinutes(missingGames * 0.3) : "-"} minutes
        </span>
        <span className={"text-gray-600"}>You can reload or leave this page and come back later</span>
      </div>
    ) : (
      <>
        <PageControl
          currentPage={currentPageNumber}
          maxPage={maxPage}
          itemsPerPage={itemsPerPage}
          totalItems={filteredAndSortedGames.length}
          searchTerm={searchTerm}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
          onSearchChange={handleSearchChange}
        />

        {filteredAndSortedGames.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[25vh] gap-4">
            <span className="text-gray-400 text-lg">No games found matching "{searchTerm}"</span>
            <button
              onClick={() => setSearchTerm("")}
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className={"flex flex-row flex-wrap gap-8 justify-evenly gap-y-10 w-[1100px] m-auto"}>
            {props.visible &&
              currentPage?.map((game) => (
                <GameCard game={game} key={game.game.uuid} onClick={() => setOpenGame(game.game.uuid)} />
              ))
            }
          </div>
        )}

        <PageControl
          currentPage={currentPageNumber}
          maxPage={maxPage}
          itemsPerPage={itemsPerPage}
          totalItems={filteredAndSortedGames.length}
          searchTerm={searchTerm}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
          onSearchChange={handleSearchChange}
          showSearch={false}
        />

      </>
    )}
    <GameCoverModal game={openGame ? games[openGame] : null} closeModalCallback={() => setOpenGame(null)} />
    <ExportModal />
  </div>;
};

export default GameView;