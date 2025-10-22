import { Button } from "@/components/ui/button";
import { useCallback, useRef, useState } from "react";
import { SteamUrlInput } from "@/features/SetupView/SteamUrlInput/SteamUrlInput.tsx";
import { useQuery } from "@tanstack/react-query";
import { loadSteamId, loadSteamNameFromId } from "@/api/apiService.ts";
import { useDispatch } from "react-redux";
import { setSteamId, setSteamName } from "@/store/slices/userSetupSlice.ts";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useAppSelector } from "@/store/store.ts";
import FamilySharedGamesSelection from "@/features/SetupView/FamilySharedGamesSelection/FamilySharedGamesSelection.tsx";

const buttonFromAnimation = { opacity: 0 };
const buttonToAnimation = { opacity: 1, delay: 1.3 };

const SetupView = (props: { visible: boolean }) => {
  const container = useRef<HTMLDivElement>(null);
  const storedSteamId = useAppSelector((state) => state.user.steamId);
  const [buttonClickCount, setButtonClickCount] = useState(0);
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
        const lastSplit = steamProfileUrl.split("id/").pop() ?? "";
        return (await loadSteamId(lastSplit.replace("/", ""))).steamid;
      }
      throw new Error("Invalid Steam Profile URL");
    },
    retry: false,
    enabled: buttonClickCount === 1 && steamProfileUrl.length > 0,
    gcTime: 0
  });

  const handleButtonClick = useCallback(async () => {
    if (buttonClickCount === 0) {
      setButtonClickCount(1);
      return;
    }
    if (isLoading) return;
    setButtonClickCount(2);
    dispatch(setSteamName(await loadSteamNameFromId(steamId ?? "")));
    dispatch(setSteamId(steamId));
  }, [buttonClickCount, isLoading, steamId, dispatch]);

  const isSteamProfileUrlValid = steamProfileUrl.startsWith("https://steamcommunity.com/id") || steamProfileUrl.startsWith("https://steamcommunity.com/profiles");
  const isButtonDisabled = buttonClickCount >= 1 && (!!error || isLoading || !isSteamProfileUrlValid);

  const getTooltipText = () => {
    if (!buttonClickCount) return "Get yourself Covered";
    if (!isSteamProfileUrlValid) return "Please enter a valid Steam Profile URL";
    if (isLoading) return ("Resolving Steam ID...");
    return "";
  };

  useGSAP(() => {
    gsap.killTweensOf([".family-shared-games-selection-container", ".steam-id-input-container"]);

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
      setButtonClickCount(2);
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
      setButtonClickCount(0);
    }
  }, { scope: container, dependencies: [storedSteamId, props.visible] });

  return (
    <div ref={container}
         className={"max-h-[60vh] w-[60vw] transition-all duration-1000 " + (storedSteamId !== undefined && props.visible ? "h-[350px]" : "h-[50px]")}>
      <div
        className={"flex items-center mt-5 content-center align-middle flex-col gap-2 lg:gap-0 lg:flex-row steam-id-input-container absolute translate-x-[-50%] left-[50%] " + (!props.visible && "pointer-events-none")}>
        <SteamUrlInput
          onChange={setSteamProfileUrl}
          isVisible={buttonClickCount == 1 && storedSteamId == undefined}
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
          {!buttonClickCount ? "Get Started" : !isLoading ? "Continue" : "Loading"}
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
