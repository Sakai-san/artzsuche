import React, { FunctionComponent } from "react";

import QuestionCombobox from "./QuestionCombobox";

import { IQuestionExtendedProps } from "./ReactCasualFormTypes";
import { IPhysician } from "../ducks/physicians/types";

const Question2: FunctionComponent<IQuestionExtendedProps> = (props) => {
  const onChangeHandler = (e: any, value: any) => {
    const { setResponse } = props;
    setResponse?.(`${value?.ProductDoctorname}, ${value?.ProductDoctorCom}`);
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
