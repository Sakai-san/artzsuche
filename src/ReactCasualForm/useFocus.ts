import { useRef, useEffect } from "react";

const FOCUSABLE_ELEMENTS = ["BUTTON", "INPUT", "TEXTAREA", "SELECT"];

const useFocus = (dependencyArray?: any[]) => {
  const domRef = useRef<null | HTMLElement>(null);

  useEffect(
    () => {
      if (
        domRef?.current?.tagName
          ?.toUpperCase?.()
          ?.match?.(new RegExp(`\\b${FOCUSABLE_ELEMENTS.join("|")}\\b`))
      ) {
        domRef?.current?.focus?.();
      } else {
        const node = domRef?.current?.querySelector?.(
          FOCUSABLE_ELEMENTS.join(", ")
        ) as any;

        node?.focus?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dependencyArray ? [...dependencyArray] : []
  );

  return domRef;
};

export default useFocus;
