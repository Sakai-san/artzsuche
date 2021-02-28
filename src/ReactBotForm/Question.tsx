import React, { FunctionComponent } from "react";
import Typist from "react-typist";

import { QuestionProps } from "./types";

const Question: FunctionComponent<QuestionProps> = ({
  setIsBotTyping,
  children,
}) => (
  <Typist
    cursor={{ hideWhenDone: true }}
    onTypingDone={() => setIsBotTyping(false)}
  >
    {children}
  </Typist>
);

export default Question;
