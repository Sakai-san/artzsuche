import React, { FunctionComponent } from "react";
import Paper from "@material-ui/core/Paper";
import CreateRoundedIcon from "@material-ui/icons/CreateRounded";
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
}));

const Anwser: FunctionComponent<IAnswerProps> = ({
  answer,
  setAnswer,
  setIsInputValid,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.answer}>
      <Paper style={{ padding: "20px" }}>{answer}</Paper>
      <CreateRoundedIcon
        fontSize="small"
        onClick={(e) => {
          setAnswer?.(null);
          // on editing reset to false (reinitialization)
          setIsInputValid?.(false);
        }}
      />
    </div>
  );
};

export default Anwser;
