import { cn } from "@/lib/utils";

function Skeleton({
	className,
	disableAnimation,
	...props
}: React.ComponentProps<"div"> & {
	disableAnimation?: boolean;
}) {
	return (
		<div
			data-slot="skeleton"
			className={cn(
				"bg-accent " +
					(!disableAnimation ? "animate-pulse " : "") +
					"rounded-md",
				className,
			)}
			{...props}
		/>
	);
}

export { Skeleton };
