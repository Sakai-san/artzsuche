import React, { FunctionComponent } from "react";

import QuestionCombobox from "./QuestionCombobox";

import { IQuestionProps } from "./QuestionType";
import { ICanton } from "../ducks/cantons/types";

const Question0: FunctionComponent<IQuestionProps> = (props) => {
  const onChangeHandler = (e: any, value: any) => {
    const { setResponse, isEditing, setCurrentQuestion } = props;
    setResponse(value);
    if (!isEditing) {
      setCurrentQuestion(1);
    }
  };
  console.log("response Question0", props.response);

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

// export default Question0;
export default React.memo(Question0);
