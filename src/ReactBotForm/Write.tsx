import React, { FunctionComponent, useContext } from "react";
import { makeStyles, createStyles } from "@material-ui/core";
import { USER_WRITER } from "./constants";
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
  const {
    inputedValue,
    setResponse,
    index,
    ref,
    setIsValid,
    isValid,
  } = useContext(ReactBotFormChildContext);
  const {
    setResponseInEdition,
    setCurrentWriter,

    currentWriter,
  } = useContext(ReactBotFormContext);
  const classes = useStyles();
  //  const ref = useFocus(currentQuestionIndex, responseInEdition, index);

  return (
    // only the very first rendering is animated
    currentWriter === USER_WRITER ? (
      <div className={isValid === undefined ? classes.display : ""}>
        {children?.({
          index,
          doValidation,
          inputedValue,
          setResponse,
          setResponseInEdition,
          setIsValid,
          ref,
          setCurrentWriter,
        })}
      </div>
    ) : null
  );
};

export default Write;
