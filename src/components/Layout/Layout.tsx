import type { ReactNode } from "react";
import { Header } from "@/components/Header/Header.tsx";
import { HeroSection } from "@/components/HeroSection/HeroSection.tsx";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import steamGridDbLogo from "@/assets/steamGridDbLogo.svg";

interface LayoutProps {
  children: ReactNode;
  mode?: "small" | "default";
}

export const Layout = ({ children, mode }: LayoutProps) => {
  useGSAP(() => {
    gsap.fromTo(".mobile-not-supported-section",
      {
        opacity: 0,
        top: "10px"
      },
      {
        opacity: 1,
        delay: 1.3,
        top: "0px",
        ease: "power2.out",
        duration: 0.3
      });
    gsap.fromTo(".steamgriddbref", {
        opacity: 0,
        top: "10px"
      },
      {
        opacity: 0.5,
        top: 0,
        delay: 1.7,
        duration: 0.7
      });
  });

  return (
    <div
      className={
        "w-full min-h-screen overflow-y-clip flex items-center justify-center text-white dark overflow-x-hidden " +
        (mode === "small" ? "pb-[200px]" : "")
      }
      style={{
        background:
          "radial-gradient(128.47% 70.71% at 50% 50%, var(--background-from) 27.4%, var(--background-to) 100%)"
      }}
    >
      <div className="flex flex-col items-center justify-center h-fit px-4 max-w-full">
        <div
          className="flex flex-col md:flex-row gap-y-5 md:gap-y-0 items-center justify-center text-center space-x-5 max-w-full py-[30px] lg:pt-[100px]">
          <Header small={mode === "small"} />

          <HeroSection
            subtitle="Get Yourself"
            title="Covered"
            tagline="Customize your Steam Library"
          />
        </div>

        <div className={"relative hidden lg:block"}>{children}</div>
        <div
          className={"relative lg:hidden text-gray-500 text-xl py-[50px] pb-[100px] text-center w-[70%] mobile-not-supported-section opacity-0"}
        >
          This app is not available on mobile devices.
        </div>
        <div className={"flex flex-row justify-center gap-20 opacity-50 mt-5 pb-20 steamgriddbref scale-90"}>
          <a href={"https://www.steamgriddb.com/"} target={"_blank"} className={"w-[250px] grayscale-25"}>
            <img src={steamGridDbLogo} alt="SteamGridDb" />
          </a>
          <div className={"flex flex-col items-center justify-center w-[350px] gap-2"}>
            <span className={"text-xl text-gray-400 text-center"}>
             This app is powered by <a href="https://www.steamgriddb.com" className={"underline text-blue-500"}
                                       target={"_blank"}>SteamGridDB</a>
            </span>
            <span className={"text-gray-500 text-center"}>
              All Covers are provided through SteamGridDB - you can find references to the artists of the covers by hovering over the covers.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
