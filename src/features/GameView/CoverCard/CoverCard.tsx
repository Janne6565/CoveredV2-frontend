import type { Cover, Game } from "@/types";
import ImageCard from "@/features/GameView/ImageCard/ImageCard.tsx";
import { useAppDispatch, useAppSelector } from "@/store/store.ts";
import Link from "@/components/ui/Link.tsx";
import { setFavoriteCover } from "@/store/slices/userSetupSlice.ts";
import { useMemo } from "react";

const CoverCard = ({ game, cover }: { game: Game, cover: Cover }) => {
  const favoriteCovers = useAppSelector((state) => state.user.favorite_covers);
  const isFavorite = useMemo(() => favoriteCovers[game.game.uuid]?.uuid == cover.uuid, [favoriteCovers]);
  const dispatch = useAppDispatch();

  return <ImageCard
    coverUrl={[cover.thumb, cover.url]}
    altText={cover.author.name}
    className={"transition-all border-2 !rounded-none possible-glow " + (isFavorite ? "border-white scale-105 glow" : "")}
    onClick={() => {
      dispatch(setFavoriteCover({ gameUuid: game.game.uuid, cover }));
    }}
    altComponent={
      <Link
        onClick={() => window.open("https://www.steamgriddb.com/profile/" + cover.author.steam64, "_blank")}
        className={"!text-gray-300"}>@{cover.author.name}</Link>
    }
  />;
};

export default CoverCard;