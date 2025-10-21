import { useAppSelector } from "@/store/store.ts";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Button } from "@/components/ui/button.tsx";
import { exportCovers } from "@/api/apiService.ts";

type ExportStep = 1 | 2 | 3;

const ExportModal = () => {
  const favoriteCovers = useAppSelector(state => state.user.favorite_covers);
  const exportTextRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const disabled = Object.keys(favoriteCovers).length === 0;
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<ExportStep>(1);
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportedBlob, setExportedBlob] = useState<Blob | null>(null);
  const [exportedFilename, setExportedFilename] = useState<string>("export.zip");
  const steamPath = "C:\\Program Files (x86)\\Steam\\appcache\\librarycache";

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  useEffect(() => {
    // Reset state when modal closes
    if (!open) {
      setCurrentStep(1);
      setExportedBlob(null);
      setExportedFilename("export.zip");
      setCopied(false);
    }
  }, [open]);

  useGSAP(() => {
    if (open) {
      gsap.to(ref.current!, {
        width: "550px",
        height: "750px",
        translate: "50% 50%",
        position: "fixed",
        backgroundColor: "var(--background-to) !important",
        right: "50vw",
        bottom: "50vh",
        duration: 0.5
      });
      gsap.to(backgroundRef.current!, {
        opacity: 0.5,
        pointerEvents: "auto"
      });
      gsap.to(modalContentRef.current!, {
        opacity: 1,
        duration: 0.4,
        delay: 0.5,
        pointerEvents: "auto"
      });
      gsap.to(exportTextRef.current!, {
        opacity: 0,
        duration: 0.5,
        pointerEvents: "none"
      });
    } else {
      gsap.to(ref.current!, {
        width: "170px",
        height: "50px",
        bottom: "6vh",
        right: "15vw",
        position: "fixed",
        translate: "0% 0%",
        background: "var(--primary) !important",
        duration: 0.5
      });
      gsap.to(backgroundRef.current!, {
        opacity: 0,
        pointerEvents: "none"
      });
      gsap.to(modalContentRef.current!, {
        opacity: 0,
        duration: 0.1,
        pointerEvents: "none"
      });
      gsap.to(exportTextRef.current!, {
        opacity: 1,
        duration: 0.5,
        pointerEvents: "auto"
      });
    }
  }, { dependencies: [open] });

  const handleRequestExport = async () => {
    setIsExporting(true);
    try {
      const coverUuids = Object.values(favoriteCovers);
      const response = await exportCovers(coverUuids.map(val => val.uuid));
      const blob = response.data as Blob;

      // Try to extract filename from Content-Disposition; fallback to export.zip
      const cd = response.headers["content-disposition"] ?? "";
      const match = /filename="?([^"]+)"?/.exec(cd);
      const filename = match?.[1] ?? "export.zip";

      setExportedBlob(blob);
      setExportedFilename(filename);
      setCurrentStep(2);
    } catch (error) {
      console.error("Export failed:", error);
      // You might want to show an error message to the user here
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyPath = async () => {
    try {
      await navigator.clipboard.writeText(steamPath);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleDownloadZip = () => {
    if (!exportedBlob) return;

    const url = URL.createObjectURL(exportedBlob);
    try {
      const a = document.createElement("a");
      a.href = url;
      a.download = exportedFilename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setCurrentStep(3);
    } finally {
      URL.revokeObjectURL(url);
    }
  };

  return <>
    <div ref={backgroundRef}
         className={"fixed w-screen h-screen bg-black left-0 top-0 opacity-0" + (open && "cursor-pointer")}
         style={{
           overflowY: "scroll",
           inset: 0,
           display: "block"
         }}
         onClick={() => setOpen(false)}>
    </div>
    <div
      ref={ref}
      className={"fixed right-[15vw] bottom-[6vh] cursor-pointer rounded bg-primary relative " + (!disabled && !open ? "pointer-events-auto hover:!bg-gray-900" : " !cursor-default")}
      style={{
        width: "170px",
        transition: open ? "none" : "background ease .3s"
      }}
      tabIndex={disabled || open ? -1 : 0}
      onClick={() => setOpen(true)}
    >
      <div ref={exportTextRef} className={"w-full h-full flex items-center justify-center text-white absolute"}>
        Export {Object.keys(favoriteCovers).length} cover{Object.keys(favoriteCovers).length > 1 ? "s" : ""}
      </div>
      <div ref={modalContentRef}
           className={"w-[550px] h-[750px] flex flex-col items-center justify-evenly text-white absolute opacity-0 p-8"}>
        <h2 className="text-2xl font-bold mb-6">Export Your Covers</h2>

        <div className="flex flex-col gap-6 w-full">
          {/* Step 1: Request Export */}
          <StepCard
            stepNumber={1}
            title="Request Export"
            description="Generate a ZIP file with your selected covers"
            isActive={currentStep === 1}
            isCompleted={currentStep > 1}
            isLocked={false}
          >
            <Button
              onClick={handleRequestExport}
              disabled={isExporting || currentStep > 1}
              className="w-full"
              shiny={currentStep == 1}
            >
              {isExporting ? "Generating..." : "Generate ZIP File"}
            </Button>
          </StepCard>

          {/* Step 2: Download ZIP */}
          <StepCard
            stepNumber={2}
            title="Download ZIP"
            description="Download the generated ZIP file to your computer"
            isActive={currentStep === 2}
            isCompleted={currentStep > 2}
            isLocked={currentStep < 2}
          >
            <Button
              onClick={handleDownloadZip}
              disabled={currentStep < 2 || currentStep > 2}
              className="w-full"
              shiny={currentStep == 2}
            >
              Download {exportedFilename}
            </Button>
          </StepCard>

          {/* Step 3: Extract Files */}
          <StepCard
            stepNumber={3}
            title="Extract to Steam"
            description="Extract the ZIP contents to your Steam library cache"
            isActive={currentStep === 3}
            isCompleted={false}
            isLocked={currentStep < 3}
          >
            <div className="text-sm space-y-2">
              <p className="font-semibold">Extract files to:</p>
              <code
                className="block bg-gray-800 p-2 rounded text-xs break-all cursor-pointer hover:bg-gray-700 transition-colors relative group"
                onClick={handleCopyPath}
                title="Click to copy path"
              >
                {steamPath}
                <div
                  className="absolute none text-xl text-black font-bold text-[15px] w-[100%] h-[100%] left-0 top-0 flex items-center justify-center"
                  style={{
                    backdropFilter: "blur(2.5px)",
                    opacity: copied ? 1 : 0
                  }}
                >
                  {copied && "✓ Copied!"}
                </div>
              </code>
              <p className="text-xs text-gray-400 mt-2">
                Open the downloaded ZIP file and extract all contents to the folder above.
              </p>
            </div>
          </StepCard>
        </div>
      </div>
    </div>
  </>;
};

interface StepCardProps {
  stepNumber: number;
  title: string;
  description: string;
  isActive: boolean;
  isCompleted: boolean;
  isLocked: boolean;
  children: React.ReactNode;
}

const StepCard = ({
                    stepNumber,
                    title,
                    description,
                    isActive,
                    isCompleted,
                    isLocked,
                    children
                  }: StepCardProps) => {
  return (
    <div
      className={`
        relative border rounded-lg p-4 transition-all duration-300
        ${isActive ? "border-primary bg-primary/5" : "border-gray-700"}
        ${isLocked ? "blur-sm opacity-50 pointer-events-none" : ""}
        ${isCompleted ? "border-green-600 bg-green-900/10" : ""}
      `}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className={`
          flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
          ${isCompleted ? "bg-green-600" : isActive ? "bg-primary" : "bg-gray-700"}
        `}>
          {isCompleted ? (
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <span className="text-white font-semibold">{stepNumber}</span>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-lg">{title}</h3>
          </div>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
      </div>
      <div className="ml-13">
        {children}
      </div>
    </div>
  );
};

export default ExportModal;