import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog.tsx";
import ProgressiveImage from "@/components/ui/ProgressiveImage.tsx";

const ImageModal = (props: {
  src: string | string[];
  open: boolean;
  setOpen: (newOpen: boolean) => void;
  imageAlt: string;
  imageClassName?: string;
}) => {
  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      <DialogContent className="!w-fit !overflow-y-hide !max-w-[95vw] !max-h-[95vh]">
        <DialogHeader>
          <DialogTitle>{props.imageAlt}</DialogTitle>
        </DialogHeader>
        <div className={`aspect-video h-[75vh] w-auto m-auto ${props.imageClassName}`}>
          <ProgressiveImage
            srcList={props.src}
            alt={props.imageAlt}
            className={"aspect-video"}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
