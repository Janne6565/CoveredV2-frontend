import { Input } from "@/components/ui/input.tsx";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useMediaQuery } from "@/hooks/useMediaQuery.tsx";
import Link from "@/components/ui/Link.tsx";
import HelpModal from "@/features/SetupView/SteamUrlInput/HelpModal/HelpModal.tsx";

interface SteamIDInputProps {
  onChange: (value: string) => void;
  isVisible: boolean;
  error?: string;
  submitCallback?: () => void;
}

export const SteamUrlInput = ({ onChange, isVisible, error, submitCallback }: SteamIDInputProps) => {
  const [isHelpModalOpen, setHelpModalOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (isVisible) {
      gsap.to(containerRef.current, {
        opacity: 1,
        width: "250px",
        marginRight: !isMobile ? "40px" : "0",
        duration: 0.4,
        ease: "power2.out"
      });
    } else {
      gsap.to(containerRef.current, {
        opacity: 0,
        width: 0,
        duration: 0.4,
        ease: "power2.in"
      });
    }
  }, { dependencies: [isVisible, isMobile] });

  const openHelpModal = () => {
    setHelpModalOpen(true);
  };

  return (
    <>
      <div
        ref={containerRef}
        className="height-fit p-0 m-auto w-0 overflow-x-hidden mx-0 flex flex-col justify-start h-[120px]"
        style={{ opacity: 0 }}
        tabIndex={isVisible ? 0 : -1}
      >
        <Input
          placeholder="Steam Community Profile URL"
          className="text-[18px] font-medium h-[48px]"
          tabIndex={isVisible ? 0 : -1}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              e.preventDefault();
              e.stopPropagation();
              submitCallback?.();
            }
          }}
        />
        <Link
          className={"text-left text-xs w-fit p-1 px-[2px] !text-gray-500 transition-all duration-300 delay-500 " + (isVisible ? "opacity-100" : "opacity-0 select-none pointer-events-none")}
          onClick={openHelpModal}>
          Where can i find this?
        </Link>
        <p className={"text-red-300"}>{error}</p>
      </div>
      <HelpModal isOpen={isHelpModalOpen} setOpen={setHelpModalOpen} />
    </>
  );
};