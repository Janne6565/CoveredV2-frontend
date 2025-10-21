import type { Cover, Game } from "@/types";
import ImageCard from "@/features/GameView/ImageCard/ImageCard.tsx";
import { useAppDispatch } from "@/store/store.ts";
import Link from "@/components/ui/Link.tsx";
import { setFavoriteCover } from "@/store/slices/userSetupSlice.ts";
import { type RefObject, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const CoverCard = ({ game, cover, favoriteCoverUuid }: { game: Game, cover: Cover, favoriteCoverUuid?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isFavorite = favoriteCoverUuid == cover.uuid;
  const dispatch = useAppDispatch();

  useGSAP(() => {
    if (isFavorite) {
      gsap.to(ref.current!, {
        duration: 0.9,
        boxShadow: "0 0 10px 5px rgba(30, 100, 180, 1)",
        backgroundColor: "rgba(15, 50, 94, 1)",
        ease: "power2.out"
      });
    } else {
      gsap.to(ref.current!, {
        backgroundColor: "rgba(15, 50, 94, 0)",
        duration: 0.9,
        boxShadow: "0 0 10px 5px rgba(15, 50, 94, 0)"
      });
    }
  }, { dependencies: [isFavorite] });

  return <ImageCard
    ref={ref as RefObject<HTMLDivElement>}
    coverUrl={[cover.thumb, cover.url]}
    altText={cover.author.name}
    className={"transition-all border-2 !rounded-none possible-glow"}
    style={{
      boxShadow: "0 0 10px 5px rgba(15, 50, 94, 0)"
    }}
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