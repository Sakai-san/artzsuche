import { useRef, useEffect, MutableRefObject } from "react";

const FOCUSABLE_ELEMENTS = ["INPUT", "TEXTAREA", "SELECT"];

const domFocus = (domRef: MutableRefObject<HTMLElement | null>) => {
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

    console.log("node", node);
    node?.focus?.();
  }
};

const useFocus = (responseInEdition: null | number, index: number) => {
  const domRef = useRef<null | HTMLElement>(null);
  const mounted = useRef(false);

  useEffect(() => {
    // focus on mounting
    if (!mounted.current) {
      mounted.current = true;
      domFocus(domRef);
    } else {
      // focus on editing
      if (responseInEdition === index) {
        domFocus(domRef);
      }
    }
  });

  return domRef;
};

export default useFocus;
