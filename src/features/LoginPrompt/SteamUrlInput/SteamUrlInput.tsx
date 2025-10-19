import { Input } from "@/components/ui/input.tsx";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip.tsx";
import { motion } from "motion/react";
import { useState } from "react";
import HelpModal from "@/features/LoginPrompt/SteamUrlInput/HelpModal/HelpModal.tsx";
import { InfoIcon } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery.tsx";

interface SteamIDInputProps {
  onChange: (value: string) => void;
  isVisible: boolean;
  error?: string;
}

export const SteamUrlInput = ({ onChange, isVisible, error }: SteamIDInputProps) => {
  const [isHelpModalOpen, setHelpModalOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const openHelpModal = () => {
    setHelpModalOpen(true);
  };

  return (
    <>
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            width: 0
          },
          visible: {
            opacity: 1,
            transition: { duration: 0.4 },
            width: "250px",
            marginRight: (!isMobile ? "40px" : "0")
          }
        }}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="height-fit p-0 m-auto w-0 overflow-x-hidden mx-0 flex flex-col gap-2 justify-start h-[90px]"
      >
        <Input
          placeholder="Steam Community Profile URL"
          className="text-[18px] font-medium h-[48px]"
          onChange={(e) => onChange(e.target.value)}
          endDecorator={
            <Tooltip>
              <TooltipTrigger onClick={openHelpModal}>
                <InfoIcon className="text-gray-300 cursor-pointer opacity-80 hover:opacity-100 transition-all" />
              </TooltipTrigger>
              <TooltipContent>
                Need help finding your Steam Community Profile URL?
              </TooltipContent>
            </Tooltip>
          }
        />
        <p className={"text-red-300"}>{error}</p>
      </motion.div>
      <HelpModal isOpen={isHelpModalOpen} setOpen={setHelpModalOpen} />
    </>
  );
};