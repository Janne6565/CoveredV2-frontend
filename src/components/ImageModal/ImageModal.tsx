import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";
import ProgressiveImage from "@/components/ui/ProgressiveImage.tsx";

const ImageModal = (props: {
  src: string | string[],
  open: boolean,
  setOpen: (newOpen: boolean) => void,
  imageAlt: string
}) => {
  return <Dialog open={props.open} onOpenChange={props.setOpen}>
    <DialogContent className="!w-[1000px] !overflow-y-auto !max-w-[95vw] !max-h-[95vh]">
      <DialogHeader>
        <DialogTitle>{props.imageAlt}</DialogTitle>
        <div className="aspect-video w-full h-auto mt-3">
          <ProgressiveImage srcList={props.src} alt={props.imageAlt} className={"aspect-video"} />
        </div>
      </DialogHeader>
    </DialogContent>
  </Dialog>;
};

export default ImageModal;