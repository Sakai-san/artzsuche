import { FunctionComponent } from "react";

import { IQuestionProps } from "./QuestionType";
import useQuestionCombobox from "./useQuestionCombobox";

import { IPhysician } from "../ducks/physicians/types";

const Question2: FunctionComponent<IQuestionProps> = (props) => {
  const onChangeHandler = (e: any, value: any) => {
    const { setResponse, isEditing, setCurrentQuestion } = props;
    setResponse(`${value?.ProductDoctorname}, ${value?.ProductDoctorCom}`);
    !isEditing && setCurrentQuestion(2);
  };

  return useQuestionCombobox({
    ...{
      getOptionLabel: (option: IPhysician) =>
        `${option?.ProductDoctorname}, ${option?.ProductDoctorCom}` || "",
      onChangeHandler: onChangeHandler,
      questionSentence: "Wähle einen Artz / eine Artzin ?",
      inputFieldLabel: "Suche nach einem/er Artz/in",
    },
    ...props,
  });
};

export default Question2;
