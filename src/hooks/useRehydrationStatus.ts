import { useEffect, useState } from "react";
import { persistor } from "@/store/store.ts";

export function useRehydrationStatus() {
  const [rehydrated, setRehydrated] = useState(false);

  useEffect(() => {
    const unsubscribe = persistor.subscribe(() => {
      const { bootstrapped } = persistor.getState();
      if (bootstrapped) {
        setRehydrated(true);
        unsubscribe();
      }
    });
  }, []);

  return rehydrated;
}
