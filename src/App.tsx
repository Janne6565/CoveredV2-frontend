import { Layout } from "@/components/Layout/Layout.tsx";
import useSetupStatus from "@/hooks/useSetupStatus.ts";
import GameView from "@/features/GameView/GameView.tsx";
import SetupView from "@/features/SetupView/SetupView.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useAppSelector } from "@/store/store.ts";

function App() {
  const queryClient = new QueryClient();
  const setupState = useSetupStatus();
  const steamId = useAppSelector(state => state.user.steamId);

  useGSAP(
    () => {
      if (setupState == "complete") {
        gsap.to("#setupView", {
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
          pointerEvents: "none",
          zIndex: 0
        });
        gsap.to("#gameView", {
          opacity: 1,
          duration: 0.8,
          height: "auto",
          minHeight: "calc(95vh - 580px)",
          pointerEvents: "auto",
          zIndex: 99
        });
      } else {
        gsap.to("#setupView", {
          opacity: 1,
          duration: 0.4,
          pointerEvents: "auto",
          zIndex: 99
        });
        gsap.to("#gameView", {
          opacity: 0,
          minHeight: 0,
          height: 0,
          pointerEvents: "none",
          zIndex: 0
        });
      }
    },
    { dependencies: [setupState] }
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Layout mode={setupState == "complete" ? "small" : "default"}>
        <div id={"setupView"}
             className={"transition-all duration-600 " + (setupState == "complete" ? "h-0" : steamId ? "h-[450px]" : "h-[250px]")}>
          <SetupView visible={setupState == "incomplete"} />
        </div>
        <div
          id={"gameView"}
          className={
            "opacity-0 pointer-events-none flex justify-center items-start " + (setupState == "complete" ? "h-fit" : "h-0")
          }
        >
          <GameView visible={setupState == "complete"} />
        </div>
      </Layout>
    </QueryClientProvider>
  );
}

export default App;
