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
      className="w-screen h-screen flex items-center justify-center text-white dark"
      style={{
        background:
          "radial-gradient(128.47% 70.71% at 50% 50%, var(--background-from) 27.4%, var(--background-to) 100%)"
      }}
    >
      <div className="flex flex-col items-center justify-center h-fit">
        <div className="flex flex-col items-center justify-center text-center space-y-5 mb-8 mt-14">
          <Header small={mode == "small"} />

          <HeroSection
            subtitle="Get Yourself"
            title="Covered"
            tagline="Customize your Steam Library"
          >
            {children}
          </HeroSection>
        </div>
      </div>
    </div>
  );
};