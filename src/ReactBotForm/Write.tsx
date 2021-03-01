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
  const { answer, setAnswer } = useContext(ReactBotFormChildContext);
  const ref = useRef();
  const classes = useStyles();

  useOutsideClick(ref, () => setAnswer?.(answer, doValidation(answer), false));

  return (
    <div
      ref={ref}
      className={
        isHidden ? classes.inputElementHidden : classes.inputElementVisible
      }
    >
      {children?.({
        doValidation,
        answer,
        setAnswer,
      })}
    </div>
  );
};

export default Write;
