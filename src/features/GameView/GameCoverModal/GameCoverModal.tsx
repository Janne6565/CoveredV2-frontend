import type { Game } from "@/types";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog.tsx";
import { useAppSelector } from "@/store/store.ts";
import PageControl from "@/features/GameView/PageControl/PageControl.tsx";
import { useEffect, useMemo, useState } from "react";
import CoverCard from "@/features/GameView/CoverCard/CoverCard.tsx";

const GameCoverModal = ({
	game,
	closeModalCallback,
}: {
	game: Game | null;
	closeModalCallback: () => void;
}) => {
	const allCovers = useAppSelector((state) => state.covers.coversForGame);
	const favoriteCovers = useAppSelector((state) => state.user.favorite_covers);
	const favoriteCoverUuid =
		game && favoriteCovers[game?.game.uuid ?? ""]
			? favoriteCovers[game.game.uuid].uuid
			: "";
	const arrayCovers = useMemo(
		() =>
			game && allCovers[game.game.uuid]
				? Object.values(allCovers[game.game.uuid]).filter(
						(cover) => cover.height == 900,
					)
				: [],
		[allCovers, game],
	);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(8);
	const currentPageCovers = useMemo(
		() =>
			arrayCovers.slice((currentPage - 1) * pageSize, currentPage * pageSize),
		[currentPage, arrayCovers, pageSize],
	);
	const maxPage = Math.ceil(arrayCovers.length / pageSize) || 1;
	useEffect(() => {
		setCurrentPage(1);
	}, [game]);

	return (
		<Dialog open={!!game} onOpenChange={closeModalCallback}>
			<DialogContent className="!w-[1100px] !h-[1200px] !max-w-[60vw] !max-h-[95vh] !overflow-y-auto flex flex-col">
				<DialogTitle style={{ display: "none" }}>{game?.game.name}</DialogTitle>
				<DialogHeader>Covers for {game?.game.name}</DialogHeader>
				<div className="flex flex-col space-between grow-1">
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
							"flex flex-row flex-wrap gap-3 justify-evenly content-start gap-y-10 m-auto w-[80%] py-5 grow-1"
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
	);
};

export default GameCoverModal;
