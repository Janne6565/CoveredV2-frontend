import logo from "@/assets/icon.svg";
import { motion } from "motion/react";

interface HeaderProps {
  logoDelay?: number;
}

export const Header = ({ logoDelay = 0.5 }: HeaderProps) => {
  return (
    <motion.img
      alt="Logo"
      className="w-48"
      src={logo}
      animate={{ opacity: [0, 1], transition: { duration: 1, delay: logoDelay } }}
    />
  );
};