import React, { FunctionComponent, useContext } from "react";
import { makeStyles } from "@material-ui/core";
import Write from "./Write";
import Read from "./Read";
import { ReactBotFormContext, ReactBotFormChildContext } from "./Context";
import { ResponseProps } from "./types";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "78px",
  },
}));

const Response: FunctionComponent<ResponseProps> = ({
  children,
  className,
  doValidation,
}) => {
  const { responseInEdition, isBotTyping } = useContext(ReactBotFormContext);
  const { isValid, index } = useContext(ReactBotFormChildContext);
  const classes = useStyles();

  return (
    <section>
      <div className={classes.root}>
        {responseInEdition !== index && isValid !== undefined ? (
          <Read doValidation={doValidation} />
        ) : (
          !isBotTyping && <Write doValidation={doValidation}>{children}</Write>
        )}
      </div>
    </section>
  );
};

export default Response;
