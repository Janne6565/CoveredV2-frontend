import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div
      className="w-screen h-screen flex items-center justify-center text-white dark"
      style={{
        background:
          "radial-gradient(128.47% 70.71% at 50% 50%, var(--background-from) 27.4%, var(--background-to) 100%)",
      }}
    >
      {children}
    </div>
  );
};