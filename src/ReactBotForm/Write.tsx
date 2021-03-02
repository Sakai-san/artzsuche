// @ts-nocheck
import React, { FunctionComponent, useContext, useRef } from "react";
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

  const ref = useRef();
  useOutsideClick(ref, () => {
    setInput?.(input, doValidation(input), false);
    console.log("useOutsideClick");
  });

  return (
    <div
      ref={ref}
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
