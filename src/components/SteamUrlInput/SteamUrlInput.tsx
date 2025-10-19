import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { motion } from "motion/react";
import Link from "../ui/Link";
import { useState } from "react";
import HelpModal from "@/components/HelpModal/HelpModal.tsx";

interface SteamIDInputProps {
  onChange: (value: string) => void;
  isVisible: boolean;
}

export const SteamUrlInput = ({ onChange, isVisible }: SteamIDInputProps) => {
  const [isHelpModalOpen, setHelpModalOpen] = useState(false);

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
            marginRight: "40px"
          }
        }}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="height-fit p-0 m-auto w-0 overflow-x-hidden mx-0"
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <Input
              placeholder="Steam Community Profile URL"
              className="h-[48px] text-[18px] font-medium"
              onChange={(e) => onChange(e.target.value)}
            />
          </TooltipTrigger>
          <TooltipContent className="text-gray-300" side="bottom">
            <p className={"text-sm"}>For help finding your Steam Profile URL click <Link
              onClick={openHelpModal}>here</Link></p>
            <p className={"text-gray-500 text-xs pt-1"}>Expected format: <br />
              <p>https://steamcommunity.com/id/_jannox/</p>
              <p>https://steamcommunity.com/id/76561198803658880/</p>
            </p>
          </TooltipContent>
        </Tooltip>
      </motion.div>
      <HelpModal isOpen={isHelpModalOpen} setOpen={setHelpModalOpen} />
    </>
  );
};