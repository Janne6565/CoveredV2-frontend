import React from "react";

interface ShinyTextProps {
	text: string;
	disabled?: boolean;
	speed?: number;
	className?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({
	text,
	disabled = false,
	speed = 5,
	className = "",
}) => {
	const animationDuration = `${speed}s`;

	return (
		<div
			className={`text-gray-400 bg-clip-text inline-block ${disabled ? "" : "animate-shine"} ${className}`}
			style={{
				backgroundImage:
					"linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 1) 60%, rgba(255, 255, 255, 0) 70%)",
				backgroundSize: "200% 100%",
				WebkitBackgroundClip: "text",
				animationDuration: animationDuration,
			}}
		>
			{text}
		</div>
	);
};

export default ShinyText;
