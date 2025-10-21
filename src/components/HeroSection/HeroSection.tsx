import { useEffect, useState } from "react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useAppDispatch, useAppSelector } from "@/store/store.ts";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip.tsx";
import Link from "@/components/ui/Link.tsx";
import { setAccessToken, setIncludeFamily, setSteamId } from "@/store/slices/userSetupSlice.ts";

interface HeroProps {
  title: string;
  subtitle: string;
  tagline: string;
}

export const HeroSection = ({ title, subtitle, tagline }: HeroProps) => {
  const steamId = useAppSelector((state) => state.user.steamId);
  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const [steamIdMirror, setSteamIdMirror] = useState("");

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
    if (steamId) {
      setSteamIdMirror(steamId);
    }
  }, [steamId]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col space-y-2"
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

      <div className={"transition-all duration-400 " + (steamId ? "h-[50px]" : "h-[0px]")}>
        <Tooltip>
          <TooltipTrigger tabIndex={-1}>
            <h5
              className={"text-m text-secondary/90 font-thin p-0 !select-text cursor-text transition-opacity duration-300 italic " + (steamId ? "opacity-100" : "opacity-0 select-none pointer-events-none")}>
              {steamIdMirror ?? ""}
            </h5>
          </TooltipTrigger>
          <TooltipContent>
            Your Steam ID
          </TooltipContent>
        </Tooltip>
        <Link
          className={"text-m !text-gray-600 font-thin p-0 !select-text cursor-pointer transition-opacity duration-300 block " + (steamId ? "opacity-100" : "opacity-0 select-none pointer-events-none")}
          onClick={() => {
            dispatch(setSteamId(undefined));
            dispatch(setIncludeFamily(undefined));
            dispatch(setAccessToken(undefined));
          }}>Logout</Link>
      </div>

    </div>
  );
};