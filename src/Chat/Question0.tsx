import { FunctionComponent } from "react";

import { IQuestionProps } from "./QuestionType";
import useQuestionCombobox from "./useQuestionCombobox";

import { ICanton } from "../ducks/cantons/types";

const Question0: FunctionComponent<IQuestionProps> = (props) => {
  const onChangeHandler = (e: any, value: any) => {
    const { setResponse, isEditing, setCurrentQuestion } = props;
    setResponse(value);
    !isEditing && setCurrentQuestion(1);
  };

  return useQuestionCombobox({
    ...{
      getOptionLabel: (option: ICanton) => option,
      onChangeHandler: onChangeHandler,
      questionSentence: "Im welchem Kanton wohnst du ?",
      inputFieldLabel: "Wähle bitte deinen Kanton",
    },
    ...props,
  });
};

export default Question0;
