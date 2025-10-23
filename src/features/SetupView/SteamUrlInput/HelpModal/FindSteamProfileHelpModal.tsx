import image1 from "@/assets/howToFindId/htfid1.png";
import image2 from "@/assets/howToFindId/htfid2.png";
import image3 from "@/assets/howToFindId/htfid3.png";
import { Kbd } from "@/components/ui/kbd.tsx";
import GenericHelpModal from "@/components/GenericHelpModal/GenericHelpModal.tsx";

const FindSteamProfileHelpModal = (props: {
  isOpen: boolean;
  setOpen: (newOpen: boolean) => void;
}) => {
  return (
    <GenericHelpModal
      title={"Finding your Steam Profile URL"}
      setOpen={props.setOpen}
      isOpen={props.isOpen}
      elements={[
        { type: "text", value: "1. Click on your profile in the top right" },
        { type: "image", value: image1, alt: "Click on your profile in the top right" },
        { type: "text", value: <>2. Click on <Kbd>View my profile</Kbd></> },
        { type: "image", value: image2, alt: "Click on 'View my profile'" },
        {
          type: "text",
          value: <>
            3. Click on the URL in the top left to copy your profile url
            <br />
            <span className="text-gray-500">
                The format can either be: https://steamcommunity.com/id/_jannox/
                or https://steamcommunity.com/profiles/76561198803658880
              </span>
          </>
        },
        {
          type: "image",
          value: image3,
          alt: "Click on the URL in the top left to copy your profile url"
        }
      ]}
    />
  );
};

export default FindSteamProfileHelpModal;
