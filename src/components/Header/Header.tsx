import logo from "@/assets/icon.svg";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface HeaderProps {
  logoDelay?: number;
  small?: boolean;
}

export const Header = ({ logoDelay = 0.5, small }: HeaderProps) => {
  const logoRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      logoRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, delay: logoDelay, ease: "power2.out" }
    );
  }, [logoDelay]);

  return (
    <div
      className={(small ? "h-50 " : "h-50") + " transition-all duration-800 delay-500"}
    >
      <img
        ref={logoRef}
        alt="Logo"
        className={"h-full w-auto"}
        src={logo}
      />
    </div>
  );
};