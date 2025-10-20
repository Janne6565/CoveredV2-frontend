import { type ReactNode, useEffect, useState } from "react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useAppSelector } from "@/store/store.ts";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip.tsx";

interface HeroProps {
  title: string;
  subtitle: string;
  tagline: string;
  children?: ReactNode;
}

export const HeroSection = ({ title, subtitle, tagline, children }: HeroProps) => {
  const steamId = useAppSelector((state) => state.user.steamId);
  const containerRef = useRef<HTMLDivElement>(null);
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
      className="flex flex-col space-y-2 px-25"
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

      <div>
        <Tooltip>
          <TooltipTrigger>
            <h5 className={"text-m text-secondary/90 font-thin p-0 !select-text cursor-text transition-opacity duration-300 " + (steamId ? "opacity-100" : "opacity-0")}>
              {steamIdMirror ?? ""}
            </h5>
          </TooltipTrigger>
          <TooltipContent>
            Your Steam ID
          </TooltipContent>
        </Tooltip>
      </div>

      <div className={"relative min-h-[250px]"}>
        {children}
      </div>
    </div>
  );
};