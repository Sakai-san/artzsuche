import React, { FunctionComponent, useContext } from "react";
import Typist from "react-typist";
import { ReactBotFormContext } from "./Context";

const Question: FunctionComponent<{}> = ({ children }) => {
  const { setIsBotTyping } = useContext(ReactBotFormContext);

  return (
    <Typist
      cursor={{ hideWhenDone: true }}
      onTypingDone={() => setIsBotTyping(false)}
    >
      {children}
    </Typist>
  );
};

export default Question;
