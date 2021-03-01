// @ts-nocheck
import React, { FunctionComponent, useContext } from "react";
import Paper from "@material-ui/core/Paper";
import { green } from "@material-ui/core/colors";
import CreateRoundedIcon from "@material-ui/icons/CreateRounded";
import ClearIcon from "@material-ui/icons/Clear";
import CheckIcon from "@material-ui/icons/Check";
import { Theme, makeStyles } from "@material-ui/core";
import { ReactBotFormChildContext } from "./Context";
import { ReadProps } from "./types";

const useStyles = makeStyles((theme: Theme) => ({
  input: {
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

const Read: FunctionComponent<ReadProps> = ({ doValidation }) => {
  const classes = useStyles();
  const { input, setInput } = useContext(ReactBotFormChildContext);

  return (
    <div className={classes.input}>
      <Paper style={{ padding: "20px" }}>{input}</Paper>
      <div className={classes.icons}>
        <CreateRoundedIcon
          fontSize="small"
          onClick={(e) => setInput?.(input, doValidation(input), true)}
        />
        {doValidation(input) ? (
          <CheckIcon fontSize="large" style={{ color: green[500] }} />
        ) : (
          <ClearIcon fontSize="large" color="action" />
        )}
      </div>
    </div>
  );
};

export default Read;
