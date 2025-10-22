import { useEffect, useState } from "react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useAppDispatch, useAppSelector } from "@/store/store.ts";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip.tsx";
import {
  clearFavorites,
  setAccessToken,
  setIncludeFamily,
  setSteamId, setSteamName, type UserState
} from "@/store/slices/userSetupSlice.ts";
import { setCovers } from "@/store/slices/coversSlice.ts";
import { setGames } from "@/store/slices/gamesSlice.ts";
import { Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuGroup,
  DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";

interface HeroProps {
  title: string;
  subtitle: string;
  tagline: string;
}

export const HeroSection = ({ title, subtitle, tagline }: HeroProps) => {
  const userConfig = useAppSelector((state) => state.user) as UserState;
  const games = useAppSelector(state => state.games.games);
  const covers = useAppSelector(state => state.covers.coversForGame);
  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const [steamNameMirror, setSteamNameMirror] = useState("");

  useGSAP(() => {
    const elements = containerRef.current?.children;
    if (!elements) return;

    // Set initial state
    gsap.set(elements, { opacity: 0, y: 5 });

    // Animate with stagger
    gsap.to(elements, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.3,
      ease: "power2.out"
    });
  }, { scope: containerRef });

  useEffect(() => {
    if (userConfig.steamName) {
      setSteamNameMirror(userConfig.steamName);
    }
  }, [userConfig]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col space-y-2 justify-center items-center"
    >
      <h5 className="text-2xl text-secondary font-thin p-0">
        {subtitle}
      </h5>

      <h1 className="text-5xl text-text-primary p-0 pb-2">
        {title}
      </h1>

      <h5 className="text-2xl text-secondary font-thin p-0">
        {tagline}
      </h5>

      <div
        tabIndex={-1}
        className={"transition-[height] text-center flex duration-400 overflow-y-hidden gap-5 w-fit " + (userConfig.steamName ? "h-[24px]" : "h-[0px]")}>
        <Tooltip>
          <TooltipTrigger tabIndex={userConfig.steamName ? 0 : -1}
                          className={"flex gap-2 items-center text-gray-400 justify-center w-fit"}>
            <h5
              className={"text-m font-thin p-0 transition-opacity duration-300 select-none " + (userConfig ? "opacity-100" : "opacity-0 pointer-events-none")}>
              {steamNameMirror ?? ""}
            </h5>
          </TooltipTrigger>
          <TooltipContent>
            Your Steam ID
          </TooltipContent>
        </Tooltip>
        <DropdownMenu>
          <DropdownMenuTrigger className={"cursor-pointer"}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Ellipsis className={"text-gray-400"} size={20} />
              </TooltipTrigger>
              <TooltipContent>
                User Settings
              </TooltipContent>
            </Tooltip>
          </DropdownMenuTrigger>
          <DropdownMenuContent className={"py-[5px] gap-2"}>
            <DropdownMenuLabel>
              <span className={"text-gray-500 select-none text-sm"}>
                SteamId: {userConfig.steamId}
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => {
                  dispatch(setCovers([]));
                  dispatch(setGames([]));
                }}
                disabled={Object.keys(games).length === 0 && Object.keys(covers).length === 0}
                className={"cursor-pointer text-gray-300"}
              >
                Reload Games/Covers
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  dispatch(setSteamId(undefined));
                  dispatch(setSteamName(undefined));
                  dispatch(setIncludeFamily(undefined));
                  dispatch(setAccessToken(undefined));
                  dispatch(setCovers([]));
                  dispatch(setGames([]));
                  dispatch(clearFavorites());
                }}
                className={"cursor-pointer text-red-300"}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

    </div>
  );
};