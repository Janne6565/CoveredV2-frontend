import { Input } from "@/components/ui/input.tsx";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Button } from "@/components/ui/button.tsx";
import Link from "@/components/ui/Link.tsx";
import AccessTokenHelpModal from "@/features/SetupView/FamilySharedGamesSelection/AccessTokenInput/AccessTokenHelpModal/AccessTokenHelpModal.tsx";

interface AccessTokenInputProps {
	onSubmit: (token: string) => void;
	isVisible: boolean;
	error?: string;
}

export const AccessTokenInput = ({
	onSubmit,
	isVisible,
	error,
}: AccessTokenInputProps) => {
	const [isHelpModalOpen, setHelpModalOpen] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const [validationError, setValidationError] = useState<string | undefined>();
	const containerRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			if (isVisible) {
				gsap.to(containerRef.current, {
					opacity: 1,
					duration: 0.5,
					ease: "power2.out",
					pointerEvents: "auto",
				});
			} else {
				gsap.to(containerRef.current, {
					opacity: 0,
					duration: 0.5,
					ease: "power2.in",
					pointerEvents: "none",
				});
			}
		},
		{ dependencies: [isVisible] },
	);

	const validateAndExtractToken = (input: string): string | null => {
		const trimmed = input.trim();

		// Try to parse as JSON first
		try {
			const parsed = JSON.parse(trimmed);
			if (parsed.success === 1 && parsed.data?.webapi_token) {
				return parsed.data.webapi_token;
			}
		} catch {
			// If not valid JSON, check if it's just the token
			// JWT tokens have 3 parts separated by dots
			if (trimmed.split(".").length === 3 && trimmed.startsWith("eyJ")) {
				return trimmed;
			}
		}

		return null;
	};

	const handleSubmit = () => {
		const token = validateAndExtractToken(inputValue);

		if (!token) {
			setValidationError(
				"Invalid access token format. Please paste the full JSON response or just the token.",
			);
			return;
		}

		setValidationError(undefined);
		onSubmit(token);
	};

	const openHelpModal = () => {
		setHelpModalOpen(true);
	};

	const displayError = validationError || error;

	return (
		<>
			<div
				ref={containerRef}
				className="flex flex-col gap-4 w-full max-w-[500px]"
				style={{ opacity: 0, pointerEvents: "none" }}
			>
				<p className="text-gray-300 text-[1rem] leading-relaxed">
					To access family shared games, you need to provide a Steam Web API
					token.
					<Link className="!text-link ml-1 text-[1rem]" onClick={openHelpModal}>
						Click here for instructions
					</Link>{" "}
					on how to get it.
				</p>

				<Input
					placeholder="Paste token or JSON response here..."
					className="text-[16px] font-medium h-[48px] w-full"
					tabIndex={isVisible ? 0 : -1}
					onChange={(e) => {
						setInputValue(e.target.value);
						setValidationError(undefined);
					}}
					value={inputValue}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							e.preventDefault();
							e.stopPropagation();
							handleSubmit();
						}
					}}
				/>

				{displayError && <p className="text-red-300 text-sm">{displayError}</p>}

				<Button
					onClick={handleSubmit}
					disabled={!inputValue.trim()}
					shiny={!!inputValue.trim()}
					tooltip={
						!inputValue.trim()
							? "Please paste your access token"
							: "Submit access token"
					}
					tabIndex={isVisible ? 0 : -1}
				>
					Submit
				</Button>
			</div>

			<AccessTokenHelpModal
				isOpen={isHelpModalOpen}
				setOpen={setHelpModalOpen}
			/>
		</>
	);
};
