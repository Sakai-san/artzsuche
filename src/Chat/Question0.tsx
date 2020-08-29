import React, { FunctionComponent, useState } from "react";
import LocalHospitalRoundedIcon from "@material-ui/icons/LocalHospitalRounded";
import Typist from "react-typist";

import { IQuestionProps } from "./QuestionType";
import useQuestionCombobox from "./useQuestionCombobox";

import { ICanton } from "../ducks/cantons/types";

const Question0: FunctionComponent<IQuestionProps> = (props) => {
  const [isTypingBot, setIsTypingBot] = useState<boolean>(true);

  const onChangeHandler = (e: any, value: any) => {
    const { setResponse, isEditing, setCurrentQuestion } = props;
    setResponse(value);
    !isEditing && setCurrentQuestion(1);
  };

  return useQuestionCombobox({
    ...props,
    ...{
      isTypingBot,
      onChangeHandler,
      getOptionLabel: (option: ICanton) => option,
      inputFieldLabel: "Wähle bitte deinen Kanton",
      questionSentenceComponent: (
        <Typist
          cursor={{ hideWhenDone: true }}
          onTypingDone={() => setIsTypingBot(false)}
        >
          <LocalHospitalRoundedIcon
            fontSize="large"
            style={{ color: "#D52B1E" }}
          />
          <span style={{ fontSize: "18px" }}>
            Im welchem Kanton wohnst du ?
          </span>
        </Typist>
      ),
    },
  });
};

export default Question0;
