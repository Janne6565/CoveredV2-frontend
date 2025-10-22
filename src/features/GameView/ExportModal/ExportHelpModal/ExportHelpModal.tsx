import image1 from "@/assets/howToExtract/image1.png";
import image2 from "@/assets/howToExtract/image2.png";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog.tsx";
import { DialogTitle } from "@radix-ui/react-dialog";
import ProgressiveImage from "@/components/ui/ProgressiveImage.tsx";
import { useState } from "react";
import ImageModal from "@/components/ImageModal/ImageModal.tsx";


const Image = (props: { src: string, alt: string, openFullScreenModal: (src: string, alt: string) => void }) => {
  return <div className="aspect-video">
    <ProgressiveImage srcList={[props.src]} alt={props.alt} className="w-full rounded-md cursor-pointer"
                      onClick={() => props.openFullScreenModal(props.src, props.alt)} />
  </div>;
};

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExportHelpModal = ({ isOpen, onClose }: HelpModalProps) => {
  const [openImage, setOpenImage] = useState<null | string>(null);
  const [imageAlt, setImageAlt] = useState<null | string>(null);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          className="!w-[1000px] !overflow-y-auto !max-w-[65vw] !max-h-[95vh]"
        >
          <DialogHeader>
            <DialogTitle>How to Extract the ZIP File</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-white text-lg">
                First open the export.zip file and then hit "Extract All" in the top bar.
              </p>
              <div className="border border-gray-700 rounded-lg overflow-hidden">
                <Image
                  src={image1}
                  alt="Extract All button in Windows Explorer"
                  openFullScreenModal={(src, alt) => {
                    setOpenImage(src);
                    setImageAlt(alt);
                  }}
                />
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-white text-lg">
                Then enter the copied Steam Library Path{" "}
                <code className="bg-gray-800 px-2 py-1 rounded text-sm">
                  C:\Program Files (x86)\Steam\appcache\librarycache
                </code>{" "}
                and then hit Extract.
              </p>
              <div className="border border-gray-700 rounded-lg overflow-hidden">
                <Image
                  src={image2}
                  alt="Enter extraction path in Windows Explorer"
                  openFullScreenModal={(src, alt) => {
                    setOpenImage(src);
                    setImageAlt(alt);
                  }}
                />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <ImageModal src={openImage ?? ""} open={!!openImage} setOpen={() => setOpenImage(null)} imageAlt={imageAlt ?? ""} />
    </>);
};

export default ExportHelpModal;