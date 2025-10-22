import { useEffect, useState } from "react";

const useWindowDimensions = () => {
  const [screenSize, setScreenSize] = useState<{ x: undefined | number, y: undefined | number }>({
    x: undefined,
    y: undefined
  });

  useEffect(() => {
    const callback = () => {
      setScreenSize({ y: window.innerHeight, x: window.innerWidth });
    };
    window.addEventListener("resize", callback);
    return () => {
      window.removeEventListener("resize", callback);
    };
  }, []);

  return screenSize;
};

export default useWindowDimensions;