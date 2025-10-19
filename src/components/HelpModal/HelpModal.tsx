import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";
import image1 from "@/assets/howToFindId/htfid1.png";
import image2 from "@/assets/howToFindId/htfid2.png";
import image3 from "@/assets/howToFindId/htfid3.png";
import type { ReactNode } from "react";

const Text = (props: { children: ReactNode }) => {
  return <p className="text-sm text-gray-500">{props.children}</p>;
};

const HelpModal = (props: { isOpen: boolean, setOpen: (newOpen: boolean) => void }) => {
  return <Dialog open={props.isOpen} onOpenChange={props.setOpen}>
    <DialogContent className="!w-[1000px] !overflow-y-auto !max-w-[95vw] !max-h-[95vh]">
      <DialogHeader>
        <DialogTitle>Finding your Steam Profile URL</DialogTitle>
      </DialogHeader>
      <img src={image1} alt="Click on your profile in the top right" className="w-[2000px]" />
      <Text>Click on your profile in the top right</Text>
      <img src={image2} alt="Click on 'View my profile'" />
      <Text>Click on 'View my profile'</Text>
      <img src={image3} alt="Click on the URL in the top left to copy your profile url" className="w-full" />
      <Text>Click on the URL in the top left to copy your profile url</Text>
    </DialogContent>
  </Dialog>;
};

export default HelpModal;