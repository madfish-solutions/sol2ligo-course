import { useState, useLayoutEffect } from "react";
import { loadTranspilerResources } from "../transpiler";

export default function useTranspiler() {
  const [error, setError] = useState<string | undefined>(undefined);
  const [loaded, setLoaded] = useState<boolean>(false);

  useLayoutEffect(() => {
    setTimeout(async () => {
      try {
        await loadTranspilerResources();
        setLoaded(true);
      } catch (e) {
        setError("Couldn't load transpiler JS files");
      }
    }, 100);
  }, []);

  return [loaded, error];
}
