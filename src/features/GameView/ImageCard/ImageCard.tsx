import ProgressiveImage from "@/components/ui/ProgressiveImage";
import { useRef, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip.tsx";

const ImageCard = ({
                     coverUrl,
                     onClick,
                     altText,
                     altComponent,
                     ref: propRef,
                     style,
                     className
                   }: {
  coverUrl: string | string[];
  onClick?: () => void;
  altText: string;
  altComponent?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  ref?: React.RefObject<HTMLDivElement>;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState<string>("perspective(800px) rotateX(0deg) rotateY(0deg)");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = propRef ? propRef.current?.getBoundingClientRect() : ref.current?.getBoundingClientRect();
    if (!rect) return;

    // Mouse position relative to card center
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation (limit the rotation for realism)
    const rotateX = ((y - centerY) / centerY) * -10; // invert for natural tilt
    const rotateY = ((x - centerX) / centerX) * 10;

    setTransform(
      `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`
    );
  };

  const handleMouseLeave = () => {
    // Reset transform smoothly
    setTransform("perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)");
  };

  return (
    <Tooltip delayDuration={200}>
      <TooltipTrigger
        onClick={onClick}
        onKeyDown={(e) => onclick && (e.key == "enter" || e.key == "space") ? onClick!() : null}
        className={"h-fit m-auto"}
      >
        <div
          ref={propRef ?? ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={"aspect-[2/3] w-[175px] h-auto cursor-pointer transition-transform duration-150 ease-out hover:scale-105 " + className}
          style={{
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
            borderRadius: "12px",
            transformStyle: "preserve-3d",
            transform,
            ...style,
          }}
        >
          <ProgressiveImage
            srcList={coverUrl}
            alt={altText}
            rounded={false}
            placeholderText={altComponent}
          />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        {altComponent}
      </TooltipContent>
    </Tooltip>
  );
};

export default ImageCard;
