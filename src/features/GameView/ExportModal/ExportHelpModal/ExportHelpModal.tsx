import image1 from "@/assets/howToExtract/image1.png";
import image2 from "@/assets/howToExtract/image2.png";
import GenericHelpModal from "@/components/GenericHelpModal/GenericHelpModal.tsx";

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExportHelpModal = ({ isOpen, onClose }: HelpModalProps) => {
  return (
    <GenericHelpModal isOpen={isOpen} setOpen={onClose} title={"How to Extract the ZIP File"} elements={[
      { type: "text", value: "1. Open the export.zip file and hten hit 'Extract All' in the top bar." },
      { type: "image", value: image1, alt: "Extract All button in Windows Explorer" },
      {
        type: "text",
        value: <>2. Enter the copied Steam Library Path <code className="bg-gray-800 px-2 py-1 rounded text-sm">C:\Program
          Files (x86)\Steam\appcache\librarycache</code> and then hit Extract.</>
      },
      { type: "image", value: image2, alt: "Enter extraction path in Windows Explorer" }
    ]} />
  );
};

export default ExportHelpModal;
