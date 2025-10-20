import logo from "@/assets/icon.svg";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface HeaderProps {
  logoDelay?: number;
}

export const Header = ({ logoDelay = 0.5 }: HeaderProps) => {
  const logoRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      logoRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, delay: logoDelay, ease: "power2.out" }
    );
  }, [logoDelay]);

  return (
    <img
      ref={logoRef}
      alt="Logo"
      className="w-48"
      src={logo}
    />
  );
};