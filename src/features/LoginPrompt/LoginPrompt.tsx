import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { useState } from "react";
import { SteamUrlInput } from "@/components/SteamUrlInput/SteamUrlInput.tsx";
import { HeroSection } from "@/components/HeroSection/HeroSection.tsx";
import { Header } from "@/components/Header/Header.tsx";

const LoginPrompt = () => {
  const [wasButtonClicked, setWasButtonClicked] = useState(false);
  const [steamID, setSteamID] = useState("");

  const isButtonDisabled = wasButtonClicked && steamID.length === 0;

  const getTooltipText = () => {
    if (isButtonDisabled) return "Please enter a valid Steam ID";
    if (steamID.length !== 0) return "Get yourself Covered";
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
          <motion.div className="flex items-center mt-5 content-center align-middle">
            <SteamUrlInput
              onChange={setSteamID} 
              isVisible={wasButtonClicked} 
            />
            
            <Button
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { duration: 0.5, delay: 1.3 }
                }
              }}
              initial="hidden"
              animate="visible"
              className="m-auto px-4 py-3 text-text-primary rounded-md text-2xl font-medium text-[18px] w-fit self-center h-[48px]"
              textClassName="text-[18px] font-medium"
              onClick={() => setWasButtonClicked(true)}
              shiny={true}
              disabled={isButtonDisabled}
              tooltip={getTooltipText()}
            >
              Get Started
            </Button>
          </motion.div>
        </HeroSection>
      </div>
    </div>
  );
};

export default LoginPrompt;
