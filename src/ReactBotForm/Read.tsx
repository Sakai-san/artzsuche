// @ts-nocheck
import React, { FunctionComponent, useContext } from "react";
import Paper from "@material-ui/core/Paper";
import { green } from "@material-ui/core/colors";
import CreateRoundedIcon from "@material-ui/icons/CreateRounded";
import ClearIcon from "@material-ui/icons/Clear";
import CheckIcon from "@material-ui/icons/Check";
import { Theme, makeStyles } from "@material-ui/core";
import { ReactBotFormChildContext } from "./Context";

import { AnswerProps } from "./types";

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

const Read: FunctionComponent<AnswerProps> = ({ doValidation }) => {
  const classes = useStyles();
  const { answer, setAnswer } = useContext(ReactBotFormChildContext);

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

export default Read;
