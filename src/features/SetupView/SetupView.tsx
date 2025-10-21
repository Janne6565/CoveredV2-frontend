import { Button } from "@/components/ui/button";
import { useCallback, useRef, useState } from "react";
import { SteamUrlInput } from "@/features/SetupView/SteamUrlInput/SteamUrlInput.tsx";
import { useQuery } from "@tanstack/react-query";
import { loadSteamId } from "@/api/apiService.ts";
import { useDispatch } from "react-redux";
import { setSteamId } from "@/store/slices/userSetupSlice.ts";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useAppSelector } from "@/store/store.ts";
import FamilySharedGamesSelection
  from "@/features/SetupView/FamilySharedGamesSelection/FamilySharedGamesSelection.tsx";

const buttonFromAnimation = { opacity: 0 };
const buttonToAnimation = { opacity: 1, delay: 1.3 };

const SetupView = (props: { visible: boolean }) => {
  const container = useRef<HTMLDivElement>(null);
  const storedSteamId = useAppSelector((state) => state.user.steamId);
  const [wasButtonClicked, setWasButtonClicked] = useState(false);
  const [steamProfileUrl, setSteamProfileUrl] = useState("");
  const dispatch = useDispatch();
  const { data: steamId, isLoading, error } = useQuery({
    queryKey: ["steamProfileUrl", steamProfileUrl],
    queryFn: async () => {
      if (steamProfileUrl.includes("https://steamcommunity.com/profiles/")) {
        const lastSplit = steamProfileUrl.split("/").pop();
        if (lastSplit) {
          return lastSplit;
        }
      }
      if (steamProfileUrl.includes("https://steamcommunity.com/id/")) {
        console.log("steamProfileUrl", steamProfileUrl);
        const lastSplit = steamProfileUrl.split("id/").pop() ?? "";
        return await loadSteamId(lastSplit.replace("/", ""));
      }
      throw new Error("Invalid Steam Profile URL");
    },
    retry: false,
    enabled: wasButtonClicked && steamProfileUrl.length > 0
  });

  const handleButtonClick = useCallback(() => {
    if (!wasButtonClicked) {
      setWasButtonClicked(true);
      return;
    }
    if (isLoading) return;
    dispatch(setSteamId(steamId));
  }, [wasButtonClicked, steamProfileUrl, steamId]);

  const isSteamProfileUrlValid = steamProfileUrl.startsWith("https://steamcommunity.com/id") || steamProfileUrl.startsWith("https://steamcommunity.com/profiles");
  const isButtonDisabled = wasButtonClicked && (!!error || isLoading || !isSteamProfileUrlValid);

  const getTooltipText = () => {
    if (!wasButtonClicked) return "Get yourself Covered";
    if (!isSteamProfileUrlValid) return "Please enter a valid Steam Profile URL";
    if (isLoading) return ("Resolving Steam ID...");
    return "";
  };

  useGSAP(() => {
    if (!props.visible) {
      gsap.to(".family-shared-games-selection-container",
        { pointerEvents: "none" });
      gsap.to(".steam-id-input-container",
        { pointerEvents: "none" });
      return;
    }

    if (storedSteamId) {
      gsap.to(".steam-id-input-container",
        {
          opacity: 0,
          left: "calc(50% - 200px)",
          pointerEvents: "none",
          duration: 0.7
        });

      gsap.to(".family-shared-games-selection-container",
        {
          opacity: 1,
          left: "50%",
          pointerEvents: "auto",
          duration: 0.7,
          ease: "power2.out",
          delay: 0.5
        });
      setWasButtonClicked(true);
    } else {
      gsap.to(".family-shared-games-selection-container",
        {
          opacity: 0,
          left: "calc(50% + 200px)",
          pointerEvents: "none",
          duration: 0.7
        });

      gsap.to(".steam-id-input-container",
        {
          opacity: 1,
          left: "50%",
          pointerEvents: "auto",
          duration: 0.7,
          ease: "power2.out",
          delay: 0.6
        });
    }
  }, { scope: container, dependencies: [storedSteamId, props.visible] });

  return (
    <div ref={container}
         className={"max-h-[60vh] w-[60vw] transition-all duration-1000 " + (storedSteamId !== undefined && props.visible ? "h-[350px]" : "h-[50px]")}>
      <div
        className={"flex items-center mt-5 content-center align-middle flex-col gap-2 lg:gap-0 lg:flex-row steam-id-input-container absolute translate-x-[-50%] left-[50%] " + (!props.visible && "pointer-events-none")}>
        <SteamUrlInput
          onChange={setSteamProfileUrl}
          isVisible={wasButtonClicked && storedSteamId == undefined}
          error={error ? "Invalid Steam Profile URL" : undefined}
          submitCallback={handleButtonClick}
        />
        <Button
          initialAnimation={buttonFromAnimation}
          animateAnimation={buttonToAnimation}
          textClassName="text-[18px] font-medium"
          onClick={handleButtonClick}
          shiny={!isButtonDisabled}
          disabled={isButtonDisabled}
          tooltip={getTooltipText()}
          tabIndex={steamId == undefined && props.visible ? 0 : -1}
        >
          {!wasButtonClicked ? "Get Started" : !isLoading ? "Continue" : "Loading"}
        </Button>
      </div>
      <div
        className="flex flex-col items-center justify-center text-center space-y-5 mt-4 absolute translate-x-[-50%] left-[50%] family-shared-games-selection-container opacity-0 max-w-[80vw] w-[500px]">
        <FamilySharedGamesSelection visible={storedSteamId !== undefined && props.visible} />
      </div>
    </div>
  );
};

export default SetupView;
