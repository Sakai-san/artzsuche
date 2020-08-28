import React, { FunctionComponent } from "react";
import Paper from "@material-ui/core/Paper";
import CreateRoundedIcon from "@material-ui/icons/CreateRounded";
import { Theme, makeStyles } from "@material-ui/core";

import { IResponseProps } from "./QuestionType";

const useStyles = makeStyles((theme: Theme) => ({
  response: {
    display: "flex",
    alignItems: "flex-end",
    "&> svg": {
      marginLeft: "10px",
    },
  },
}));

const Response: FunctionComponent<IResponseProps> = ({
  response,
  setResponse,
  setIsEditing,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.response}>
      <Paper style={{ padding: "20px" }}>{response}</Paper>
      <CreateRoundedIcon
        fontSize="small"
        onClick={(e) => {
          setIsEditing(true);
          setResponse(null);
        }}
      />
    </div>
  );
};

export default Response;
