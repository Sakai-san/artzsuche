import React, { FunctionComponent, useContext } from "react";
import { makeStyles } from "@material-ui/core";
import Write from "./Write";
import Read from "./Read";
import { USER_WRITER, BOT_WRITER } from "./constants";
import { ReactBotFormContext, ReactBotFormChildContext } from "./Context";
import { ResponseProps } from "./types";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    minHeight: "94px",
    marginBottom: "40px",
    /*
    
    read => height: 76px
    height: 71px in autocomplete
    height: 93px in input number
    height: 94px in textarea
    */
  },
  write: {
    marginTop: "15px",
  },
}));

const Response: FunctionComponent<ResponseProps> = ({
  children,
  doValidation,
}) => {
  const { responseInEdition, currentWriter, currentQuestionIndex } = useContext(
    ReactBotFormContext
  );
  const { isValid, index } = useContext(ReactBotFormChildContext);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {currentWriter === USER_WRITER &&
      (responseInEdition === index || index === currentQuestionIndex) ? (
        <div className={classes.write}>
          <Write doValidation={doValidation}>{children}</Write>
        </div>
      ) : (
        <Read doValidation={doValidation} />
      )}
    </div>
  );
};

export default Response;
