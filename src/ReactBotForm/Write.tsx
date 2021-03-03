// @ts-nocheck
import React, { FunctionComponent, useContext } from "react";
import { Theme, makeStyles } from "@material-ui/core";
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
  const { response, setResponse, index } = useContext(ReactBotFormChildContext);
  const { responseInEdition, setResponseInEdition } = useContext(
    ReactBotFormContext
  );

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
        response,
        setResponse,
        responseInEdition,
        setResponseInEdition,
      })}
    </div>
  );
};

export default Write;
