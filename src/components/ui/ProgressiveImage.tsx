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

		srcList.forEach((src) => {
			const img = new Image();
			img.src = src;
			img.onload = () => {
				setLoadedImages((prev) => new Set(prev).add(src));
			};
			img.onerror = () => {
				setError(true);
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
					className={`absolute inset-0 w-full h-full object-cover ${rounded ? "rounded-xl" : ""} transition-opacity duration-${transitionDuration} ease-in-out ${
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
