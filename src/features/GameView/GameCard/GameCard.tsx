import type { Game } from "@/types";
import { normalizePlaytime } from "@/lib/utils.ts";
import { useAppSelector } from "@/store/store.ts";
import ImageCard from "@/features/GameView/ImageCard/ImageCard.tsx";

const GameCard = ({ game, onClick }: { game: Game; onClick: () => void }) => {
	const favoriteCovers = useAppSelector((state) => state.user.favorite_covers);

	return (
		<ImageCard
			key={game.game.uuid}
			coverUrl={
				favoriteCovers[game.game.uuid]
					? [
							favoriteCovers[game.game.uuid].thumb,
							favoriteCovers[game.game.uuid].url,
						]
					: game.game.library_image_url
			}
			altText={
				game.game.name + " - Playtime: " + normalizePlaytime(game.playtime)
			}
			altComponent={
				<>
					{game.game.name + " - Playtime: " + normalizePlaytime(game.playtime)}
				</>
			}
			onClick={onClick}
		/>
	);
};

export default GameCard;
