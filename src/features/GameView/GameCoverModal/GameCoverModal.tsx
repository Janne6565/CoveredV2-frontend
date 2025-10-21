import type { Game } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";
import { useAppSelector } from "@/store/store.ts";
import PageControl from "@/features/GameView/PageControl/PageControl.tsx";
import { useEffect, useMemo, useState } from "react";
import CoverCard from "@/features/GameView/CoverCard/CoverCard.tsx";

const GameCoverModal = ({ game, closeModalCallback }: { game: Game | null, closeModalCallback: () => void }) => {
  const allCovers = useAppSelector((state) => state.covers.coversForGame);
  const arrayCovers = useMemo(() => game && allCovers[game.game.uuid]
      ? Object.values(allCovers[game.game.uuid]).filter(cover => cover.height == 900)
      : [],
    [allCovers, game]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const currentPageCovers = useMemo(() => arrayCovers.slice((currentPage - 1) * pageSize, currentPage * pageSize), [currentPage, arrayCovers, pageSize]);
  const maxPage = Math.ceil(arrayCovers.length / pageSize) || 1;
  useEffect(() => {
    setCurrentPage(1);
  }, [game]);

  return (
    <Dialog open={!!game} onOpenChange={closeModalCallback}>
      <DialogContent className="!w-[1100px] !max-w-[60vw] !max-h-[95vh] !overflow-y-auto">
        <DialogTitle style={{ display: "none" }}>{game?.game.name}</DialogTitle>
        <DialogHeader>Covers for {game?.game.name}</DialogHeader>
        <div>
          <PageControl currentPage={currentPage} maxPage={maxPage} itemsPerPage={pageSize}
                       totalItems={arrayCovers.length}
                       onPageChange={setCurrentPage} onItemsPerPageChange={setPageSize} className={"!w-[700px] py-5"}
                       itemsPerPageOptions={[12, 24, 36, 48]} />
          <div className={"flex flex-row flex-wrap gap-3 justify-evenly gap-y-10 m-auto w-[80%] py-5"}>
            {game &&
              currentPageCovers.map((cover) => <CoverCard game={game} cover={cover} key={cover.uuid} />)
            }
          </div>
          <PageControl currentPage={currentPage} maxPage={maxPage} itemsPerPage={pageSize}
                       totalItems={arrayCovers.length}
                       onPageChange={setCurrentPage} onItemsPerPageChange={setPageSize} className={"!w-[700px] py-5"}
                       itemsPerPageOptions={[12, 24, 36, 48]} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GameCoverModal;