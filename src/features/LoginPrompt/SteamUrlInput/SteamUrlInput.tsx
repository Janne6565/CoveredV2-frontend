import { Input } from "@/components/ui/input.tsx";
import { motion } from "motion/react";
import { useState } from "react";
import HelpModal from "@/features/LoginPrompt/SteamUrlInput/HelpModal/HelpModal.tsx";
import { useMediaQuery } from "@/hooks/useMediaQuery.tsx";
import Link from "@/components/ui/Link.tsx";

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
        className="height-fit p-0 m-auto w-0 overflow-x-hidden mx-0 flex flex-col justify-start h-[120px]"
      >
        <Input
          placeholder="Steam Community Profile URL"
          className="text-[18px] font-medium h-[48px]"
          onChange={(e) => onChange(e.target.value)}
        />
        <Link
          className={"text-left text-xs w-fit p-1 px-[2px] !text-gray-500 transition-all duration-300 delay-1000 " + (isVisible ? "opacity-100" : "opacity-0")}
          onClick={openHelpModal}>
          Where can i find this?
        </Link>
        <p className={"text-red-300"}>{error}</p>
      </motion.div>
      <HelpModal isOpen={isHelpModalOpen} setOpen={setHelpModalOpen} />
    </>
  );
};