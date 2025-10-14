import logo from "@/assets/icon.svg";
import ShinyText from "@/components/ShinyText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";
import { useState } from "react";

const variants = {
	hidden: { opacity: 0, y: 5, animate: { duration: 0.5 } },
	visible: { opacity: 1, y: 0 },
};

const LoginPrompt = () => {
	const [wasButtonClicked, setWasButtonClicked] = useState(false);
	const [steamID, setSteamID] = useState("");

	return (
		<div className="flex flex-col items-center justify-center">
			<div className="flex flex-col items-center justify-center text-center space-y-5 mb-8 mt-15">
				<motion.img
					alt="Logo"
					className="w-48"
					src={logo}
					animate={{ opacity: [0, 1], transition: { duration: 1, delay: 0.5 } }}
				/>
				{/* container handles stagger for its children */}
				<motion.div
					className="flex flex-col space-y-2 px-25"
					initial="hidden"
					animate="visible"
					variants={{
						hidden: {},
						visible: {
							transition: {
								staggerChildren: 0.3,
								delayChildren: 0.5,
								duration: 0.5,
							},
						},
					}}
				>
					<motion.h5
						className="text-2xl text-secondary font-thin p-0"
						variants={variants}
					>
						Get Yourself
					</motion.h5>

					<motion.h1
						className="text-5xl text-text-primary p-0 pb-2"
						variants={variants}
					>
						Covered
					</motion.h1>

					<motion.h5
						className="text-2xl text-secondary font-thin p-0"
						variants={variants}
					>
						Customize your Steam Library
					</motion.h5>
					<motion.div className="flex items-center mt-5 content-center align-middle">
						<motion.div
							variants={{
								hidden: {
									opacity: 0,
									width: 0,
								},
								visible: {
									opacity: 1,
									transition: { duration: 0.4 },
									width: "220px",
									marginRight: "40px",
								},
							}}
							initial="hidden"
							animate={!wasButtonClicked ? "hidden" : "visible"}
							className="height-fit p-0 m-auto w-0 overflow-x-hidden mx-0"
						>
							<Input
								type="number"
								placeholder="Enter your Steam ID"
								className="h-[48px] text-[18px] font-medium"
								onChange={(e) => setSteamID(e.target.value)}
							/>
						</motion.div>
						<Button
							variants={{
								hidden: {
									opacity: 0,
								},
								visible: {
									opacity: 1,
									transition: { duration: 0.5, delay: 1.3 },
								},
							}}
							initial="hidden"
							animate="visible"
							className="m-auto m-auto px-4 py-3 text-text-primary rounded-md text-2xl font-medium text-[18px] w-fit self-center h-[48px]"
							textClassName="text-[18px] font-medium"
							onClick={() => setWasButtonClicked(true)}
							shiny={true}
							disabled={wasButtonClicked && steamID.length === 0}
							tooltip={
								wasButtonClicked && steamID.length === 0
									? "Please enter a valid Steam ID"
									: steamID.length !== 0
										? "Get yourself Covered"
										: ""
							}
						>
							Get Started
						</Button>
					</motion.div>
				</motion.div>
			</div>
		</div>
	);
};

export default LoginPrompt;
