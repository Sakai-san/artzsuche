import { useRef, useEffect, MutableRefObject } from "react";

const FOCUSABLE_ELEMENTS = ["INPUT", "TEXTAREA", "SELECT"];

const domFocus = (domRef: MutableRefObject<HTMLElement | null> | null) => {
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
};

const useFocus = (
  domRef: MutableRefObject<HTMLDivElement | null> | null,
  responseInEdition: null | number,
  index: number
) => {
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
};

export default useFocus;
