import { useRef, useEffect } from "react";

const useFocus = (dependencyArray?: any[]) => {
  const domRef = useRef<null | HTMLDivElement>(null);

  useEffect(
    () => {
      domRef?.current?.focus?.();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dependencyArray ? [...dependencyArray] : []
  );

  return domRef;
};

export default useFocus;
