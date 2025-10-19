import React, { useEffect, useMemo, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface ProgressiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  srcList: string | string[];
  alt: string;
  className?: string;
  skeletonClassName?: string;
  transitionDuration?: number; // ms for fade-in/out transitions (default: 500)
  placeholderFadeDuration?: number; // how long to keep placeholder after first image (default: 1000)
}

const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
                                                             srcList: src,
                                                             alt,
                                                             className,
                                                             skeletonClassName,
                                                             transitionDuration = 200,
                                                             placeholderFadeDuration = 0,
                                                             ...props
                                                           }) => {
  const [currentSrc, setCurrentSrc] = useState<string | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const srcList = useMemo(() => Array.isArray(src) ? src : [src], [src]);

  useEffect(() => {
    if (!srcList?.length) return;

    srcList.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setLoadedImages((prev) => new Set(prev).add(src));
      };
    });
  }, [srcList]);

  useEffect(() => {
    // Update currentSrc to best available quality
    for (let i = srcList.length - 1; i >= 0; i--) {
      if (loadedImages.has(srcList[i])) {
        setCurrentSrc(srcList[i]);
        break;
      }
    }
  }, [loadedImages, srcList]);

  // When we get our first image, fade out placeholder after delay
  useEffect(() => {
    if (currentSrc && showPlaceholder) {
      setShowPlaceholder(false);
    }
  }, [currentSrc, showPlaceholder, placeholderFadeDuration]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Image layer */}
      {currentSrc && (
        <img
          src={currentSrc}
          alt={alt}
          className={`absolute inset-0 w-full h-full object-cover rounded-xl transition-opacity duration-${transitionDuration} ease-in-out ${
            showPlaceholder ? "opacity-0" : "opacity-100"
          } ${className ?? ""}`}
          {...props}
          onClick={props.onClick}
        />
      )}

      {/* Placeholder skeleton */}
      {showPlaceholder && (
        <div
          className={`absolute inset-0 transition-opacity duration-${transitionDuration} ease-in-out pointer-events-none ${
            currentSrc ? "opacity-100" : "opacity-100"
          }`}
        >
          <Skeleton className={skeletonClassName ?? "w-full h-full rounded-xl"} />
        </div>
      )}
    </div>
  );
};

export default ProgressiveImage;
