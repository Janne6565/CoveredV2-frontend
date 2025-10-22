import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ShinyText from "../ShinyText";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground hover:bg-primary/90",
				destructive:
					"bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
				outline:
					"border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
				secondary:
					"bg-secondary text-secondary-foreground hover:bg-secondary/80",
				ghost:
					"hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
				link: "text-primary underline-offset-4 hover:underline",
			},
			size: {
				default: "h-9 px-4 py-2 has-[>svg]:px-3",
				sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
				lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
				icon: "size-9",
				"icon-sm": "size-8",
				"icon-lg": "size-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

interface ButtonProps
	extends React.ComponentProps<"button">,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	shiny?: boolean;
	initialAnimation?: { opacity?: number };
	animateAnimation?: { opacity?: number; delay?: number };
	textClassName?: string;
	tooltip?: string;
}

function Button({
	className,
	variant,
	size,
	children,
	textClassName,
	shiny = false,
	initialAnimation,
	animateAnimation,
	...props
}: ButtonProps) {
	const buttonRef = useRef<HTMLButtonElement>(null);

	useGSAP(() => {
		if (initialAnimation) {
			gsap.set(buttonRef.current, initialAnimation);
		}
		if (animateAnimation) {
			gsap.to(buttonRef.current, {
				...animateAnimation,
				duration: 0.5,
				ease: "power2.out",
			});
		}
	}, [initialAnimation, animateAnimation]);

	const handleMouseEnter = () => {
		if (props.disabled) return;
		gsap.to(buttonRef.current, {
			boxShadow: "0 0 5px rgba(0, 153, 255, 0.3)",
			scale: 1.03,
			duration: 0.2,
			ease: "power2.out",
		});
	};

	const handleMouseLeave = () => {
		if (props.disabled) return;
		gsap.to(buttonRef.current, {
			boxShadow: "none",
			scale: 1,
			duration: 0.2,
			ease: "power2.out",
		});
	};

	const handleMouseDown = () => {
		if (props.disabled) return;
		gsap.to(buttonRef.current, {
			scale: 0.995,
			duration: 0.1,
			ease: "power2.out",
		});
	};

	const handleMouseUp = () => {
		if (props.disabled) return;
		gsap.to(buttonRef.current, {
			scale: 1.03,
			duration: 0.1,
			ease: "power2.out",
		});
	};

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<button
					ref={buttonRef}
					className={`${className} ${props.disabled ? "bg-gray-800" : "bg-primary cursor-pointer"} transition-colors duration-300 mx-auto my-0 px-4 py-3 text-text-primary rounded-md text-2xl font-medium text-[18px] w-fit self-start h-[48px] min-w-[110px]`}
					onClick={props.onClick}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
					onMouseDown={handleMouseDown}
					onMouseUp={handleMouseUp}
					disabled={props.disabled}
					tabIndex={props.tabIndex}
				>
					{shiny ? (
						<ShinyText
							speed={2}
							text={children as string}
							className={textClassName}
						/>
					) : (
						children
					)}
				</button>
			</TooltipTrigger>
			{props.tooltip && (
				<TooltipContent className="text-gray-300" side={"bottom"}>
					{props.tooltip}
				</TooltipContent>
			)}
		</Tooltip>
	);
}

export { Button, buttonVariants };
