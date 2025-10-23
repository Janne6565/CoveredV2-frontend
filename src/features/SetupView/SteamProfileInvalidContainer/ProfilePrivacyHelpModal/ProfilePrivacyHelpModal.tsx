import GenericHelpModal from "@/components/GenericHelpModal/GenericHelpModal.tsx";
import image1 from "@/assets/howToFindId/htfid1.png";
import image2 from "@/assets/howToFindId/htfid2.png";
import image3 from "@/assets/profilePrivacyImages/image1.png";
import image4 from "@/assets/profilePrivacyImages/image2.png";
import image5 from "@/assets/profilePrivacyImages/image3.png";

const ProfilePrivacyHelpModal = (props: { isOpen: boolean, setOpen: (newOpen: boolean) => void }) => {
  return <GenericHelpModal
    isOpen={props.isOpen}
    setOpen={props.setOpen}
    title={"How to set your profile privacy"}
    elements={[
      { type: "text", value: "1. Navigate to your profile" },
      { type: "image", value: image1, alt: "Navigate to your profile" },
      { type: "image", value: image2, alt: "Navigate to your profile - step 2" },
      { type: "text", value: "2. Hit 'Edit Profile'" },
      { type: "image", value: image3, alt: "Hit 'Edit Profile'" },
      { type: "text", value: "3. Go to 'Privacy Settings'" },
      { type: "image", value: image4, alt: "Go to Privacy Settings" },
      {
        type: "text",
        value: "4. Make sure the first two options are set to 'Public' ('My Profile' and 'Game Details') if you want to see your playtime then also make sure not to hide your playtime."
      },
      { type: "image", value: image5, alt: "Set options to public" }
    ]}
  />;
};

export default ProfilePrivacyHelpModal;