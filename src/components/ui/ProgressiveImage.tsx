import React, { useEffect, useMemo, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface ProgressiveImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  srcList: string | string[];
  alt: string;
  className?: string;
  skeletonClassName?: string;
  rounded?: boolean;
  transitionDuration?: number; // ms for fade-in/out transitions (default: 500)
  placeholderFadeDuration?: number; // how long to keep placeholder after first image (default: 1000)
  placeholderText?: string | React.ReactNode;
}

const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
                                                             srcList: src,
                                                             alt,
                                                             className,
                                                             skeletonClassName,
                                                             rounded = true,
                                                             transitionDuration = 200,
                                                             placeholderFadeDuration = 0,
                                                             placeholderText,
                                                             ...props
                                                           }) => {
  const [currentSrc, setCurrentSrc] = useState<string | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [error, setError] = useState(false);
  const srcList = useMemo(() => (Array.isArray(src) ? src : [src]), [src]);

  useEffect(() => {
    if (!srcList?.length) return;

    const imgs: HTMLImageElement[] = [];
    let canceled = false;

    srcList.forEach((s) => {
      const img = new Image();
      imgs.push(img);
      img.src = s;
      img.onload = () => {
        if (canceled) return;
        setLoadedImages((prev) => {
          const next = new Set(prev);
          next.add(s);
          return next;
        });
      };
      img.onerror = () => {
        if (canceled) return;
        setError(true);
      };
    });

    return () => {
      canceled = true;
      imgs.forEach((i) => {
        i.onload = null;
        i.onerror = null;
        try {
          // clear src to help GC
          (i as any).src = "";
        } catch {
          // ignore
        }
      });
    };
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

  useEffect(() => {
    if (currentSrc && showPlaceholder) {
      if (placeholderFadeDuration > 0) {
        const t = setTimeout(() => setShowPlaceholder(false), placeholderFadeDuration);
        return () => clearTimeout(t);
      } else {
        setShowPlaceholder(false);
      }
    }
    // placeholderFadeDuration is used above, so include it in deps
  }, [currentSrc, showPlaceholder, placeholderFadeDuration]);

  const isClickable = Boolean(props.onClick);
  const clickableProps: Partial<React.ImgHTMLAttributes<HTMLImageElement>> = isClickable
    ? {
      role: (props as any).role ?? "button",
      tabIndex: (props as any).tabIndex ?? 0,
      onKeyDown:
        (props as any).onKeyDown ??
        ((e: React.KeyboardEvent<HTMLImageElement>) => {
          const key = e.key;
          if (key === "Enter" || key === " " || key === "Spacebar") {
            // call original onClick handler; cast to any so runtime call works
            (props.onClick as any)?.(e as any);
          }
        })
    }
    : {};

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Image layer */}
      {currentSrc && (
        <img
          src={currentSrc}
          alt={alt}
          className={`absolute inset-0 w-full h-full object-cover ${rounded ? "rounded-xl" : ""} transition-opacity duration-${transitionDuration} ease-in-out ${
            showPlaceholder ? "opacity-0" : "opacity-100"
          } ${className ?? ""}`}
          {...props}
          {...clickableProps}
        />
      )}

      {/* Placeholder skeleton */}
      {showPlaceholder && (
        <div
          className={`absolute inset-0 transition-opacity duration-${transitionDuration} ease-in-out pointer-events-none ${
            currentSrc ? "opacity-100" : "opacity-100"
          } ${rounded ? "rounded-xl" : ""}`}
        >
          <Skeleton
            className={
              skeletonClassName ??
              "w-full h-full flex items-center justify-center " +
              (rounded ? "rounded-xl" : "rounded-none")
            }
            disableAnimation={error}
          >
            {placeholderText && (
              <div className="flex items-center justify-center h-full w-full text-gray-400 text-center">
                {placeholderText}
              </div>
            )}
          </Skeleton>
        </div>
      )}
    </div>
  );
};

export default ProgressiveImage;