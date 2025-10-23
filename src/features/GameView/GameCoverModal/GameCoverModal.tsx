import type { Cover, Game } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog.tsx";
import { useAppSelector } from "@/store/store.ts";
import PageControl from "@/features/GameView/PageControl/PageControl.tsx";
import { useEffect, useMemo, useState } from "react";
import CoverCard from "@/features/GameView/CoverCard/CoverCard.tsx";
import useWindowDimensions from "@/hooks/useWindowDimensions.ts";
import ImageModal from "@/components/ImageModal/ImageModal.tsx";

const GameCoverModal = ({
                          game,
                          closeModalCallback
                        }: {
  game: Game | null;
  closeModalCallback: () => void;
}) => {
  const [favoriteOpened, setFavoriteOpened] = useState(false);
  const allCovers = useAppSelector((state) => state.covers.coversForGame);
  const favoriteCovers = useAppSelector((state) => state.user.favorite_covers);
  const { y: screenHeight } = useWindowDimensions();
  const favoriteCoverUuid =
    game && favoriteCovers[game?.game.uuid ?? ""]
      ? favoriteCovers[game.game.uuid].uuid
      : "";
  const arrayCovers = useMemo(
    () =>
      game && allCovers[game.game.uuid]
        ? Object.values(allCovers[game.game.uuid]).filter(
          (cover) => cover.height === 900
        )
        : [],
    [allCovers, game]
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(!screenHeight ? 8 : screenHeight < 1200 ? 8 : 12);
  const currentPageCovers = useMemo(
    () =>
      arrayCovers.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    [currentPage, arrayCovers, pageSize]
  );
  const maxPage = Math.ceil(arrayCovers.length / pageSize) || 1;
  const [favoriteCoverMirror, setFavoriteCoverMirror] = useState<Cover | null>(null);

  useEffect(() => {
    setCurrentPage(1);
    setFavoriteCoverMirror(null);
  }, [game]);

  useEffect(() => {
    if (!game) return;
    const favoriteCover = favoriteCovers[game.game.uuid];
    if (favoriteCover) {
      setFavoriteCoverMirror(favoriteCover);
    }
  }, [favoriteCovers, game]);

  useEffect(() => {
    const height = screenHeight ?? window.innerHeight;
    if (height === undefined) return;
    if (height < 1200) {
      setPageSize(8);
    } else {
      setPageSize(12);
    }
  }, [screenHeight, game]);

  if (!game) {
    return;
  }

  return (
    <>
      <Dialog open={!!game} onOpenChange={closeModalCallback}>
        <DialogContent className="!w-[1100px] !h-[1200px] !max-w-[60vw] !max-h-[95vh] !overflow-y-show flex flex-col ">
          <DialogTitle style={{ display: "none" }}>{game?.game.name}</DialogTitle>

          {favoriteCoverMirror &&
            <div
              className={`fixed top-[50%] inset-0 w-fit p-[5px] aspect-[2/3] h-fit w-fit bg-background-to justify-around text-center flex transition-all rounded-md ${game ? "visible" : "invisible"} ${favoriteCovers[game.game.uuid] ? "opacity-100" : "opacity-0"}`}
              style={{
                left: "calc(calc(calc(100vw - min(1100px, 60vw)) / 4) * -1)",
                zIndex: 9999,
                transform: "translateY(-50%) translateX(-50%)",
                pointerEvents: "all"
              }}
            >
              <CoverCard game={game} cover={favoriteCoverMirror} favoriteCoverUuid={""} className={"!w-[12vw] !m-0"}
                         disableClick={true} onClick={() => setFavoriteOpened(true)} />
            </div>
          }

          <DialogHeader>Covers for {game?.game.name}</DialogHeader>
          <div className="flex flex-col space-between grow-1 overflow-y-auto">
            <PageControl
              currentPage={currentPage}
              maxPage={maxPage}
              itemsPerPage={pageSize}
              totalItems={arrayCovers.length}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={setPageSize}
              className={"!w-[700px] py-5"}
              itemsPerPageOptions={[8, 12, 24, 36, 48]}
            />
            <div
              className={
                "flex flex-row flex-wrap gap-3 justify-center content-start gap-y-10 m-auto w-[80%] py-5 grow-1"
              }
            >
              {game &&
                currentPageCovers.map((cover) => (
                  <CoverCard
                    game={game}
                    cover={cover}
                    key={cover.uuid}
                    favoriteCoverUuid={favoriteCoverUuid}
                  />
                ))}
            </div>
            <PageControl
              currentPage={currentPage}
              maxPage={maxPage}
              itemsPerPage={pageSize}
              totalItems={arrayCovers.length}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={setPageSize}
              className={"!w-[700px] py-5"}
              itemsPerPageOptions={[8, 12, 24, 36, 48]}
            />
          </div>
        </DialogContent>
      </Dialog>
      <ImageModal src={favoriteCoverMirror?.url ?? ""} imageAlt={favoriteCoverMirror?.author.name ?? ""}
                  open={favoriteOpened} setOpen={() => setFavoriteOpened(false)}
                  imageClassName={"!aspect-[2/3]"}
      />
    </>
  );
};

export default GameCoverModal;
