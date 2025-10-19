import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { stagger } from "motion";

const textVariants = {
  hidden: { opacity: 0, y: 5, animate: { duration: 0.5 } },
  visible: { opacity: 1, y: 0 }
};

interface HeroProps {
  title: string;
  subtitle: string;
  tagline: string;
  children?: ReactNode;
}

export const HeroSection = ({ title, subtitle, tagline, children }: HeroProps) => {
  return (
    <motion.div
      className="flex flex-col space-y-2 px-25"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: stagger(0.3),
            duration: 0.5
          }
        }
      }}
    >
      <motion.h5
        className="text-2xl text-secondary font-thin p-0"
        variants={textVariants}
      >
        {subtitle}
      </motion.h5>

      <motion.h1
        className="text-5xl text-text-primary p-0 pb-2"
        variants={textVariants}
      >
        {title}
      </motion.h1>

      <motion.h5
        className="text-2xl text-secondary font-thin p-0"
        variants={textVariants}
      >
        {tagline}
      </motion.h5>

      {children}
    </motion.div>
  );
};