import React, { FunctionComponent } from "react";
import Paper from "@material-ui/core/Paper";
import { green } from "@material-ui/core/colors";
import CreateRoundedIcon from "@material-ui/icons/CreateRounded";
import ClearIcon from "@material-ui/icons/Clear";
import CheckIcon from "@material-ui/icons/Check";
import { Theme, makeStyles } from "@material-ui/core";

import { IAnswerProps } from "./types";

const useStyles = makeStyles((theme: Theme) => ({
  answer: {
    display: "flex",
    alignItems: "flex-end",
    "&> svg": {
      marginLeft: "10px",
    },
  },
  icons: {
    marginLeft: "10px",
    display: "flex",
    flexDirection: "column",
  },
}));

const Anwser: FunctionComponent<IAnswerProps> = ({
  answer,
  setAnswer,
  doValidation,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.answer}>
      <Paper style={{ padding: "20px" }}>{answer}</Paper>
      <div className={classes.icons}>
        <CreateRoundedIcon
          fontSize="small"
          onClick={(e) => setAnswer?.(answer, doValidation(answer), true)}
        />
        {doValidation(answer) ? (
          <CheckIcon fontSize="large" style={{ color: green[500] }} />
        ) : (
          <ClearIcon fontSize="large" color="action" />
        )}
      </div>
    </div>
  );
};

export default Anwser;
