import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog.tsx";
import image1 from "@/assets/howToFindId/htfid1.png";
import image2 from "@/assets/howToFindId/htfid2.png";
import image3 from "@/assets/howToFindId/htfid3.png";
import { type ReactNode, useState } from "react";
import ProgressiveImage from "@/components/ui/ProgressiveImage.tsx";
import ImageModal from "@/components/ImageModal/ImageModal.tsx";
import { Kbd } from "@/components/ui/kbd.tsx";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip.tsx";

const Text = (props: { children: ReactNode; className?: string }) => {
	return (
		<p className={"text-sm text-gray-300 mt-4 pb-1 " + props.className}>
			{props.children}
		</p>
	);
};

const Image = (props: {
	src: string;
	alt: string;
	openFullScreenModal: (src: string, alt: string) => void;
}) => {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<div className="aspect-video">
					<ProgressiveImage
						srcList={[props.src]}
						alt={props.alt}
						className="w-full rounded-md cursor-pointer"
						onClick={() => props.openFullScreenModal(props.src, props.alt)}
					/>
				</div>
			</TooltipTrigger>
			<TooltipContent>Click on the image to expand</TooltipContent>
		</Tooltip>
	);
};

const HelpModal = (props: {
	isOpen: boolean;
	setOpen: (newOpen: boolean) => void;
}) => {
	const [openImage, setOpenImage] = useState<null | string>(null);
	const [openAlt, setOpenAlt] = useState<null | string>(null);

	const openFullScreenModal = (src: string, alt: string) => {
		setOpenImage(src);
		setOpenAlt(alt);
	};

	return (
		<>
			<Dialog open={props.isOpen} onOpenChange={props.setOpen}>
				<DialogContent className="!w-[1000px] !overflow-y-auto !max-w-[65vw] !max-h-[95vh]">
					<DialogHeader>
						<DialogTitle>Finding your Steam Profile URL</DialogTitle>
					</DialogHeader>
					<div>
						<Text>1. Click on your profile in the top right</Text>
						<Image
							src={image1}
							alt={"Click on your profile in the top right"}
							openFullScreenModal={openFullScreenModal}
						/>
						<Text>
							2. Click on <Kbd>View my profile</Kbd>
						</Text>
						<Image
							src={image2}
							alt={"Click on 'View my profile'"}
							openFullScreenModal={openFullScreenModal}
						/>
						<Text>
							3. Click on the URL in the top left to copy your profile url
						</Text>
						<Text className="text-gray-500 !mt-0">
							The format can either be: https://steamcommunity.com/id/_jannox/
							or https://steamcommunity.com/profiles/76561198803658880
						</Text>
						<Image
							src={image3}
							alt={"Click on the URL in the top left to copy your profile url"}
							openFullScreenModal={openFullScreenModal}
						/>
					</div>
				</DialogContent>
			</Dialog>
			<ImageModal
				open={!!openImage}
				src={openImage ?? ""}
				setOpen={() => setOpenImage(null)}
				imageAlt={openAlt ?? ""}
			/>
		</>
	);
};

export default HelpModal;
