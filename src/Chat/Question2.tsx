import React, { FunctionComponent } from "react";

import QuestionCombobox from "./QuestionCombobox";

import { IQuestionProps } from "./QuestionType";
import { IPhysician } from "../ducks/physicians/types";

const Question2: FunctionComponent<IQuestionProps> = (props) => {
  const onChangeHandler = (e: any, value: any) => {
    const { setResponse, isEditing, setCurrentQuestion } = props;
    setResponse(`${value?.ProductDoctorname}, ${value?.ProductDoctorCom}`);
    if (!isEditing) {
      setCurrentQuestion(2);
    }
  };

  const { children } = props;

  return (
    <QuestionCombobox
      {...{
        ...props,
        ...{
          onChangeHandler,
          getOptionLabel: (option: IPhysician) =>
            `${option?.ProductDoctorname}, ${option?.ProductDoctorCom}` || "",
          inputFieldLabel: "Suche nach einem/er Artz/in",
        },
      }}
    >
      {children}
    </QuestionCombobox>
  );
};

export default Question2;
