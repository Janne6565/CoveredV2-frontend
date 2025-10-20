import { useAppDispatch } from "@/store/store.ts";
import { setIncludeFamily, setSteamId } from "@/store/slices/userSetupSlice.ts";
import { MoveLeft } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip.tsx";
import { Separator } from "@/components/ui/separator.tsx";

const ClickableBox = (props: { onClick: () => void, children: React.ReactNode }) => (
  <div className={"flex flex-col gap-2 items-center cursor-pointer ho"} onClick={props.onClick}>{props.children}</div>
);

const FamilySharedGamesSelection = () => {
  const dispatch = useAppDispatch();

  return <>
    <p className={"w-fit text-text-primary text-xl mt-7"}>Do you want to include family shared games?</p>

    <div className={"flex flex-col gap-4 mt-4 text-gray-300 text-2xl mb-5"}>
      <ClickableBox onClick={() => {
        dispatch(setIncludeFamily(true));
      }}>
        Yes
        <p className={"text-gray-600 text-sm w-[300px]"}>
          Only works if you have a family shared account and requires additional authentication
        </p>
      </ClickableBox>
      <Separator />
      <ClickableBox onClick={() => dispatch(setIncludeFamily(false))}>
        No
      </ClickableBox>
    </div>

    <Tooltip>
      <TooltipTrigger asChild>
        <span onClick={() => dispatch(setSteamId(undefined))}
              className={"flex gap-2 items-center text-2xl text-gray-500 mt-8 pb-1 cursor-pointer"}>
          <MoveLeft size={40} fontWeight={1} />
          <span className={"relative top-[-2px]"}>Back</span>
        </span>
      </TooltipTrigger>
      <TooltipContent side={"bottom"}>
        Reset your Steam ID
      </TooltipContent>
    </Tooltip>
  </>;
};

export default FamilySharedGamesSelection;