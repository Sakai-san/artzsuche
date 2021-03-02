// @ts-nocheck
import React, { FunctionComponent, useContext, useRef, useEffect } from "react";
import { Theme, makeStyles } from "@material-ui/core";
import useOutsideClick from "@rooks/use-outside-click";
import { ReactBotFormChildContext } from "./Context";
import { WriteProps } from "./types";

const useStyles = makeStyles((theme: Theme) => ({
  inputElementVisible: {
    visibility: "visible",
    opacity: 1,
    transition: "opacity 2s ease-in",
  },
  inputElementHidden: {
    visibility: "hidden",
    opacity: 0,
  },
}));

const Write: FunctionComponent<WriteProps> = ({
  isHidden,
  children,
  doValidation,
}) => {
  const { input, setInput } = useContext(ReactBotFormChildContext);
  const classes = useStyles();

  const node = useRef();
  /*
  useOutsideClick(ref, () => {
    setInput?.(input, doValidation(input), false);
    console.log("useOutsideClick");
  });
*/

  // https://medium.com/@pitipatdop/little-neat-trick-to-capture-click-outside-with-react-hook-ba77c37c7e82
  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    console.log("OutsideClick", input);
    setInput?.(input, doValidation(input), false);
  };

  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={node}
      className={
        isHidden ? classes.inputElementHidden : classes.inputElementVisible
      }
    >
      {children?.({
        doValidation,
        input,
        setInput,
      })}
    </div>
  );
};

export default Write;
