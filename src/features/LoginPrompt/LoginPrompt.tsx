import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { useCallback, useState } from "react";
import { SteamUrlInput } from "@/features/LoginPrompt/SteamUrlInput/SteamUrlInput.tsx";
import { HeroSection } from "@/components/HeroSection/HeroSection.tsx";
import { Header } from "@/components/Header/Header.tsx";
import { useQuery } from "@tanstack/react-query";
import { loadSteamId } from "@/api/apiService.ts";
import { useDispatch } from "react-redux";
import { setSteamId } from "@/store/slices/userSetupSlice.ts";

const LoginPrompt = () => {
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
  const isButtonDisabled = wasButtonClicked && (!!error || isLoading);

  const getTooltipText = () => {
    if (!wasButtonClicked) return "Get yourself Covered";
    if (!isSteamProfileUrlValid) return "Please enter a valid Steam Profile URL";
    if (isLoading) return ("Resolving Steam ID...");
    return "";
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center text-center space-y-5 mb-8 mt-15">
        <Header />

        <HeroSection
          subtitle="Get Yourself"
          title="Covered"
          tagline="Customize your Steam Library"
        >
          <motion.div
            className="flex items-center mt-5 content-center align-middle flex-col gap-2 lg:gap-0 lg:flex-row ">
            <SteamUrlInput
              onChange={setSteamProfileUrl}
              isVisible={wasButtonClicked}
              error={error ? "Invalid Steam Profile URL" : undefined}
            />
            <Button
              variants={{
                hidden: { opacity: 0, pointerEvents: "none" },
                visible: {
                  opacity: 1,
                  pointerEvents: "auto",
                  transition: { duration: 0.5, delay: 1.3 }
                }
              }}
              initial="hidden"
              animate="visible"
              className="mx-auto my-0 px-4 py-3 text-text-primary rounded-md text-2xl font-medium text-[18px] w-fit self-start h-[48px] min-w-[110px]"
              textClassName="text-[18px] font-medium"
              onClick={handleButtonClick}
              shiny={!isButtonDisabled}
              disabled={isButtonDisabled}
              tooltip={getTooltipText()}
            >
              {!wasButtonClicked ? "Get Started" : !isLoading ? "Continue" : "Loading"}
            </Button>
          </motion.div>
        </HeroSection>
      </div>
    </div>
  );
};

export default LoginPrompt;
