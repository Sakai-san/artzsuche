import { FunctionComponent } from "react";

import { IQuestionProps } from "./QuestionType";
import useQuestionCombobox from "./useQuestionCombobox";

const Question0: FunctionComponent<IQuestionProps> = (props) => {
  const onChangeHandler = (e: any, value: any) => {
    const { setResponse, isEditing, setCurrentQuestion } = props;
    setResponse(value);
    !isEditing && setCurrentQuestion(1);
  };

  return useQuestionCombobox({
    ...{
      getOptionLabel: (option: string) => option,
      onChangeHandler: onChangeHandler,
      questionMessage: "Im welchem Kanton wohnst du ?",
      inputFieldLabel: "Wähle bitte deinen Kanton",
    },
    ...props,
  });
};

export default Question0;
