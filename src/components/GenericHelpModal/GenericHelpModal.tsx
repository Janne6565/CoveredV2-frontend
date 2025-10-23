import { type ReactNode, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip.tsx";
import ProgressiveImage from "@/components/ui/ProgressiveImage.tsx";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";
import ImageModal from "@/components/ImageModal/ImageModal.tsx";

const Text = (props: { children: ReactNode; className?: string }) => {
  return (
    <p className={"text-sm text-gray-300 mt-4 pb-1 " + props.className}>
      {props.children}
    </p>
  );
};

const Image = (props: {
  src: string;
  alt: string;
  openFullScreenModal: (src: string, alt: string) => void;
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="aspect-video">
          <ProgressiveImage
            srcList={[props.src]}
            alt={props.alt}
            className="w-full rounded-md cursor-pointer"
            onClick={() => props.openFullScreenModal(props.src, props.alt)}
          />
        </div>
      </TooltipTrigger>
      <TooltipContent>Click on the image to expand</TooltipContent>
    </Tooltip>
  );
};

export interface HelpModalProps {
  isOpen: boolean;
  setOpen: (newOpen: boolean) => void;
  elements: { type: "image" | "text", value: string | ReactNode, alt?: string, className?: string }[];
  title: string;
}

const GenericHelpModal = (props: HelpModalProps) => {
  const [openImage, setOpenImage] = useState<null | string>(null);
  const [openAlt, setOpenAlt] = useState<null | string>(null);

  const openFullScreenModal = (src: string, alt: string) => {
    setOpenImage(src);
    setOpenAlt(alt);
  };

  return (
    <>
      <Dialog open={props.isOpen} onOpenChange={props.setOpen}>
        <DialogContent className="!w-[1000px] !overflow-y-auto !max-w-[65vw] !max-h-[95vh]">
          <DialogHeader>
            <DialogTitle>{props.title}</DialogTitle>
          </DialogHeader>
          <div>
            {
              props.elements.map((element, index) => {
                if (element.type === "image") {
                  return (
                    <Image
                      key={index}
                      src={element.value as string}
                      alt={element.alt ?? ""}
                      openFullScreenModal={openFullScreenModal}
                    />
                  );
                } else {
                  return (
                    <Text key={index} className={element.className ?? ""}>
                      {element.value}
                    </Text>
                  );
                }
              })
            }
          </div>
        </DialogContent>
      </Dialog>
      <ImageModal
        open={!!openImage}
        src={openImage ?? ""}
        setOpen={() => setOpenImage(null)}
        imageAlt={openAlt ?? ""}
      />
    </>
  );
};

export default GenericHelpModal;