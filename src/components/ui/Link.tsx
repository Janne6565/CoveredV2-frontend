import type { ReactNode } from "react";

const Link = (props: {
	onClick: () => void;
	children: ReactNode;
	className?: string;
	enableTab?: boolean;
}) => {
	return (
		<a
			onClick={props.onClick}
			className={"text-primary cursor-pointer " + props.className}
			tabIndex={props.enableTab ? 0 : -1}
		>
			{props.children}
		</a>
	);
};

export default Link;
