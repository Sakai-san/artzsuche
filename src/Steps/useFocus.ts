import { useRef, useEffect } from "react";

const useFocus = () => {
  const domRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    domRef?.current?.querySelector("input")?.focus?.();
  }, []);

  return domRef;
};

export default useFocus;
