import type { ProfileInvalidityReason } from "@/types";
import Link from "@/components/ui/Link.tsx";
import { useEffect, useState } from "react";
import ProfilePrivacyHelpModal
  from "@/features/SetupView/SteamProfileInvalidContainer/ProfilePrivacyHelpModal/ProfilePrivacyHelpModal.tsx";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip.tsx";
import { MoveLeft } from "lucide-react";

const SteamProfileInvalidContainer = (props: {
  invalidityReason?: ProfileInvalidityReason,
  backCallback: () => void,
  visible: boolean
}) => {
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [invalidityReasonMirror, setInvalidityReasonMirror] = useState<ProfileInvalidityReason | undefined>(undefined);
  useEffect(() => {
    if (props.invalidityReason) {
      setInvalidityReasonMirror(props.invalidityReason);
    }
  }, [props.invalidityReason]);

  return <>
    <div className={"h-[80px] w-[400px] relative"}>
      <div
        className={"absolute transition-all " + (invalidityReasonMirror == "PROFILE_NOT_FOUND" ? "opacity-100" : "opacity-0") + " " + (props.invalidityReason && props.visible ? "pointer-events-none select-none" : "")}>
        It seems like your profile could not be found. Please make sure your Steam Profile URL is correct and that your
        profile is set to public.
      </div>
      <div
        className={"absolute transition-all " + (invalidityReasonMirror == "GAMES_NOT_ACCESSIBLE" ? "opacity-100" : "opacity-0") + " " + (props.invalidityReason && props.visible ? "pointer-events-none select-none" : "")}>
        It seems like we can not access your Steam Library. Please make sure your Steam Profile URL is correct and check
        your profile privacy settings.
      </div>
    </div>
    <Link className={"!text-gray-500 w-[350px]"} onClick={() => setHelpModalOpen(true)} enableTab={props.visible}>
      How do i set my profile to public and how do i configure the privacy settings?
    </Link>
    <Tooltip>
      <TooltipTrigger asChild disabled={!props.visible}>
					<span
            onClick={() => props.visible && props.backCallback()}
            onKeyDown={(e) => {
              if (!props.visible) return;
              if (e.key === "Enter" || e.key === " ") {
                props.backCallback();
              }
            }}
            className={
              "flex gap-2 items-center text-2xl text-gray-400 mt-4 pb-1 " +
              (props.visible ? "cursor-pointer" : "")
            }
            tabIndex={props.visible ? 0 : -1}
          >
						<MoveLeft size={40} fontWeight={1} />
						<span
              className={
                "relative top-[-2px] " + (!props.visible && "select-none")
              }
            >
							Back
						</span>
					</span>
      </TooltipTrigger>
      {props.visible && <TooltipContent side={"bottom"}>Back to login</TooltipContent>}
    </Tooltip>
    <ProfilePrivacyHelpModal isOpen={helpModalOpen} setOpen={setHelpModalOpen} />
  </>;
};

export default SteamProfileInvalidContainer;