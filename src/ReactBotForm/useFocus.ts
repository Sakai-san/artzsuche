import { useRef, useEffect } from "react";

const FOCUSABLE_ELEMENTS = ["INPUT", "TEXTAREA", "SELECT"];

const useFocus = (enable: boolean) => {
  const domRef = useRef<null | HTMLElement>(null);

  useEffect(() => {
    if (enable) {
      if (
        // parent
        domRef?.current?.tagName
          ?.toUpperCase?.()
          ?.match?.(new RegExp(`\\b${FOCUSABLE_ELEMENTS.join("|")}\\b`))
      ) {
        domRef?.current?.focus?.();
      } else {
        // children
        const node = domRef?.current?.querySelector?.(
          FOCUSABLE_ELEMENTS.join(", ")
        ) as any;

        node?.focus?.();
      }
    }
  });

  return domRef;
};

export default useFocus;
