import type { ReactNode } from "react";
import { Header } from "@/components/Header/Header.tsx";
import { HeroSection } from "@/components/HeroSection/HeroSection.tsx";

interface LayoutProps {
  children: ReactNode;
  mode?: "small" | "default";
}

export const Layout = ({ children, mode }: LayoutProps) => {
  return (
    <div
      className={"w-full h-full min-h-screen flex items-center justify-center text-white dark overflow-x-hidden " + (mode == "small" ? "pb-[200px]" : "")}
      style={{
        background:
          "radial-gradient(128.47% 70.71% at 50% 50%, var(--background-from) 27.4%, var(--background-to) 100%)"
      }}
    >
      <div className="flex flex-col items-center justify-center h-fit px-4 max-w-full">
        <div
          className="flex flex-row items-center justify-center text-center space-x-5 max-w-full py-[100px] pb-[30px]">
          <Header small={mode == "small"} />

          <HeroSection
            subtitle="Get Yourself"
            title="Covered"
            tagline="Customize your Steam Library"
          />
        </div>

        <div className={"relative"}>
          {children}
        </div>
      </div>
    </div>
  );
};