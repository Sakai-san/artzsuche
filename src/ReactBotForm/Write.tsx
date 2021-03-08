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
    transition: "opacity 0.2s ease-in",
  },
  inputElementHidden: {
    visibility: "hidden",
    opacity: 0,
  },
}));

const Write: FunctionComponent<WriteProps> = ({ children, doValidation }) => {
  const { input, setResponse, index, setIsValid } = useContext(
    ReactBotFormChildContext
  );
  const { responseInEdition, setResponseInEdition, isBotTyping } = useContext(
    ReactBotFormContext
  );

  const classes = useStyles();
  const domRef = useFocus(responseInEdition, index);

  return (
    <div
    /*
      className={
        isBotTyping ? classes.inputElementHidden : classes.inputElementVisible
      }*/
    >
      {children?.({
        index,
        doValidation,
        input,
        setResponse,
        responseInEdition,
        setResponseInEdition,
        setIsValid,
        domRef,
      })}
    </div>
  );
};

export default Write;
