import React, { FunctionComponent } from "react";

import QuestionCombobox from "./QuestionCombobox";

import { IQuestionExtendedProps } from "./ReactCasualFormTypes";
import { ICanton } from "../ducks/cantons/types";

const Question0: FunctionComponent<IQuestionExtendedProps> = (props) => {
  const onChangeHandler = (e: any, value: any) => {
    const { setResponse } = props;
    setResponse?.(value);
  };

  const { children } = props;

  return (
    <QuestionCombobox
      {...{
        ...props,
        ...{
          onChangeHandler,
          getOptionLabel: (option: ICanton) => option,
          inputFieldLabel: "Wähle bitte deinen Kanton",
        },
      }}
    >
      {children}
    </QuestionCombobox>
  );
};

export default Question0;
