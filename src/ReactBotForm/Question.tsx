import React, { FunctionComponent, useContext } from "react";
import Typist from "react-typist";
import { makeStyles } from "@material-ui/core";
import { ReactBotFormContext } from "./Context";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    borderRadius: "0px 10px 10px 10px",
    backgroundColor: "#f2f2f3",
    padding: "3px 0 14px 5px",
  },
}));

const Question: FunctionComponent<{}> = ({ children }) => {
  const { setIsBotTyping } = useContext(ReactBotFormContext);
  const classes = useStyles();

  return (
    <Typist
      className={classes.wrapper}
      cursor={{ hideWhenDone: true }}
      onTypingDone={() => setIsBotTyping(false)}
    >
      {children}
    </Typist>
  );
};

export default Question;
