import React, { FunctionComponent, useContext } from "react";
import { makeStyles } from "@material-ui/core";
import Write from "./Write";
import Read from "./Read";
import { ReactBotFormContext, ReactBotFormChildContext } from "./Context";
import { ResponseProps } from "./types";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "flex-end",
    height: "94px",
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
  const { responseInEdition, isBotTyping } = useContext(ReactBotFormContext);
  const { isValid, index } = useContext(ReactBotFormChildContext);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {responseInEdition !== index && isValid !== undefined ? (
        <Read doValidation={doValidation} />
      ) : (
        !isBotTyping && (
          <div className={classes.write}>
            <Write doValidation={doValidation}>{children}</Write>
          </div>
        )
      )}
    </div>
  );
};

export default Response;
