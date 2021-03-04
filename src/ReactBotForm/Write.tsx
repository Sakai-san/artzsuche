// @ts-nocheck
import React, { FunctionComponent, useContext } from "react";
import { Theme, makeStyles } from "@material-ui/core";
import useFocus from "./useFocus";
import { ReactBotFormChildContext, ReactBotFormContext } from "./Context";
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
  const { input, setResponse, index } = useContext(ReactBotFormChildContext);
  const { responseInEdition, setResponseInEdition } = useContext(
    ReactBotFormContext
  );
  const domRef = useFocus(responseInEdition === index);

  const classes = useStyles();

  return (
    <div
      className={
        isHidden ? classes.inputElementHidden : classes.inputElementVisible
      }
    >
      {children?.({
        index,
        doValidation,
        input,
        setResponse,
        responseInEdition,
        setResponseInEdition,
        domRef,
      })}
    </div>
  );
};

export default Write;
