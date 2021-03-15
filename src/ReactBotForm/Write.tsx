import React, { FunctionComponent, useContext } from "react";
import { makeStyles, createStyles } from "@material-ui/core";
import useFocus from "./useFocus";
import { ReactBotFormChildContext, ReactBotFormContext } from "./Context";
import { WriteProps } from "./types";

const ANIMATION_DURATION = 500;

const useStyles = makeStyles((theme) =>
  createStyles({
    "@keyframes display": {
      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
      },
    },
    display: {
      animation: `$display ${ANIMATION_DURATION}ms ease-in`,
    },
  })
);

const Write: FunctionComponent<WriteProps> = ({ children, doValidation }) => {
  const { input, setResponse, index, setIsValid, isValid } = useContext(
    ReactBotFormChildContext
  );
  const { responseInEdition, setResponseInEdition } = useContext(
    ReactBotFormContext
  );
  const classes = useStyles();
  const ref = useFocus(responseInEdition, index);

  return (
    // only the very first rendering is animated
    <div className={isValid === undefined ? classes.display : ""}>
      {children?.({
        index,
        doValidation,
        input,
        setResponse,
        responseInEdition,
        setResponseInEdition,
        setIsValid,
        ref,
      })}
    </div>
  );
};

export default Write;
