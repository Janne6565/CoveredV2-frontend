import { useAppDispatch, useAppSelector } from "@/store/store.ts";
import { setIncludeFamily, setSteamId, setAccessToken } from "@/store/slices/userSetupSlice.ts";
import { MoveLeft } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useCallback } from "react";
import {
  AccessTokenInput
} from "@/features/SetupView/FamilySharedGamesSelection/AccessTokenInput/AccessTokenInput.tsx";

const ClickableBox = (props: {
  onClick: () => void,
  children: React.ReactNode,
  className?: string,
  disable?: boolean
}) => (
  <div
    className={"flex flex-col gap-2 items-center " + (props.disable ? "pointer-events-none select-none " : "cursor-pointer ") + "bg-border p-3 py-5 rounded-[5px] hover:bg-gray-800 transition-colors duration-500 " + props.className}
    onClick={props.disable ? () => {
    } : props.onClick}
    tabIndex={props.disable ? -1 : 0}
    onKeyDown={(e) => {
      if (props.disable) return;
      if (e.key === "Enter" || e.key === " ") {
        props.onClick();
      }
    }}
  >{props.children}</div>
);

const FamilySharedGamesSelection = (props: { visible: boolean }) => {
  const dispatch = useAppDispatch();
  const userSetup = useAppSelector(state => state.user);

  const goBack = useCallback(() => {
    if (userSetup.includeFamily) {
      dispatch(setIncludeFamily(undefined));
      return;
    }
    dispatch(setSteamId(undefined));
  }, [dispatch, userSetup.includeFamily]);

  const handleAccessTokenSubmit = useCallback((token: string) => {
    dispatch(setAccessToken(token));
  }, [dispatch]);

  useGSAP(() => {
    if (!props.visible) {
      gsap.to(".family-shared-selection-decision", {
        pointerEvents: "none"
      });
      gsap.to(".access-token-input", {
        pointerEvents: "none"
      });
      return;
    }

    if (userSetup.includeFamily) {
      gsap.to(".family-shared-selection-decision", {
        opacity: 0,
        left: "-100px",
        duration: 0.5,
        ease: "power2.out",
        pointerEvents: "none"
      });

      gsap.to(".access-token-input", {
        opacity: 1,
        left: "50%",
        duration: 0.5,
        pointerEvents: "auto"
      });
    } else {
      gsap.to(".family-shared-selection-decision", {
        opacity: 1,
        left: "50%",
        pointerEvents: "auto"
      });

      gsap.to(".access-token-input", {
        opacity: 0,
        left: "calc(50% + 100px)",
        duration: 0.5,
        ease: "power2.out",
        pointerEvents: "none"
      });
    }
  }, { dependencies: [userSetup.includeFamily, props.visible] });

  return <>
    <div className={"relative min-h-[300px] w-[250px]"}>
      <div
        className={"flex flex-col gap-4 mt-4 text-gray-300 text-2xl mb-5 absolute translate-x-[-50%] left-[50%] family-shared-selection-decision"}>
        <p className={"w-fit text-text-primary text-xl " + (!props.visible && "select-none")}>
          Do you want to include family shared games?
        </p>

        <ClickableBox
          onClick={() => dispatch(setIncludeFamily(true))}
          disable={!props.visible || userSetup.includeFamily !== undefined}
        >
          Yes
          <p className={"text-gray-600 text-sm w-[300px]"}>
            Only works if you have a family shared account and requires additional authentication
          </p>
        </ClickableBox>
        <Separator />
        <ClickableBox
          onClick={() => dispatch(setIncludeFamily(false))}
          disable={!props.visible || userSetup.includeFamily !== undefined}>
          No
        </ClickableBox>
      </div>
      <div
        className={"flex flex-col gap-4 mt-4 w-[250px] text-gray-300 text-2xl mb-5 absolute left-[50%] translate-x-[-50%] access-token-input items-center " + (!props.visible && "pointer-events-none select-none")}>
        <AccessTokenInput
          onSubmit={handleAccessTokenSubmit}
          isVisible={userSetup.includeFamily === true && props.visible}
        />
      </div>

    </div>
    <Tooltip>
      <TooltipTrigger asChild>
        <span onClick={() => props.visible && goBack()}
              onKeyDown={(e) => {
                if (!props.visible) return;
                if (e.key === "Enter" || e.key === " ") {
                  goBack();
                }
              }}
              className={"flex gap-2 items-center text-2xl text-gray-400 mt-8 pb-1 " + (props.visible ? "cursor-pointer" : "")}
              tabIndex={props.visible ? 0 : -1}>
          <MoveLeft size={40} fontWeight={1} />
          <span className={"relative top-[-2px] " + (!props.visible && "select-none")}>Back</span>
        </span>
      </TooltipTrigger>
      <TooltipContent side={"bottom"}>
        Revert to previous step
      </TooltipContent>
    </Tooltip>
  </>;

};


export default FamilySharedGamesSelection;