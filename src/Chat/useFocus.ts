import { useRef, useEffect } from "react";

const useFocus = (dependencyArray?: any[]) => {
  const domRef = useRef<null | HTMLElement>(null);

  useEffect(
    () => {
      (domRef?.current?.querySelector?.(
        "input, button, textarea, select"
      ) as HTMLElement)?.focus?.();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dependencyArray ? [...dependencyArray] : []
  );

  return domRef;
};

export default useFocus;
