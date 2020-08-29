import React, { FunctionComponent, useState } from "react";
import LocalHospitalRoundedIcon from "@material-ui/icons/LocalHospitalRounded";
import Typist from "react-typist";

import { IQuestionProps } from "./QuestionType";
import useQuestionCombobox from "./useQuestionCombobox";

import { IPhysician } from "../ducks/physicians/types";

const Question2: FunctionComponent<IQuestionProps> = (props) => {
  const [isTypingBot, setIsTypingBot] = useState<boolean>(true);

  const onChangeHandler = (e: any, value: any) => {
    const { setResponse, isEditing, setCurrentQuestion } = props;
    setResponse(`${value?.ProductDoctorname}, ${value?.ProductDoctorCom}`);
    !isEditing && setCurrentQuestion(2);
  };

  return useQuestionCombobox({
    ...props,
    ...{
      isTypingBot,
      onChangeHandler,
      getOptionLabel: (option: IPhysician) =>
        `${option?.ProductDoctorname}, ${option?.ProductDoctorCom}` || "",
      inputFieldLabel: "Suche nach einem/er Artz/in",
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
            Wähle einen Artz / eine Artzin ?
          </span>
        </Typist>
      ),
    },
  });
};

export default Question2;
