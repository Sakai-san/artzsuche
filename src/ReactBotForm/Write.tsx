// @ts-nocheck
import React, { FunctionComponent, useContext, useRef } from "react";
import { Theme, makeStyles } from "@material-ui/core";
import useOutsideClick from "@rooks/use-outside-click";
import { ReactBotFormChildContext } from "./Context";

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

interface WriteProps {
  isHidden: boolean;
  children: (...args: any) => JSX.Element;
}

const Write: FunctionComponent<WriteProps> = ({
  isHidden,
  children,
  doValidation,
}) => {
  const context = useContext(ReactBotFormChildContext);
  const ref = useRef();
  const classes = useStyles();

  useOutsideClick(ref, () =>
    context?.setAnswer?.(context?.answer, doValidation(context?.answer), false)
  );

  return (
    <div
      ref={ref}
      className={
        isHidden ? classes.inputElementHidden : classes.inputElementVisible
      }
    >
      {children?.({
        doValidation,
        answer: context?.answer,
        setAnswer: context?.setAnswer,
      })}
    </div>
  );
};

export default Write;
