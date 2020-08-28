import React, { FunctionComponent, useState } from "react";
import RoomRoundedIcon from "@material-ui/icons/RoomRounded";
import TextField from "@material-ui/core/TextField";
import Typist from "react-typist";

import VisibilityTransition from "./VisibilityTransition";
import Response from "./Response";
import useFocus from "./useFocus";

import { IQuestionProps } from "./QuestionType";

const validation = (input: string | undefined) =>
  input && input.length === 4 && !input.startsWith("0");

const Question1: FunctionComponent<IQuestionProps> = ({
  response,
  setResponse,
  setCurrentQuestion,
  className,
  isEditing,
  setIsEditing,
}) => {
  const [isTyping, setIsTyping] = useState<boolean>(true);
  const domRef = useFocus([response, isTyping]);
  const [isInvalidInput, setInvalidInput] = useState<boolean>(false);

  const onChangeHandler = (event: any) => {
    const enteredZip = event.target.value;

    if (!validation(enteredZip)) {
      setInvalidInput(true);
    } else {
      setInvalidInput(false);

      setTimeout(() => {
        setResponse(enteredZip);
        !isEditing && setCurrentQuestion(2);
      }, 500);
    }
  };

  return (
    <section className={className}>
      <div>
        <span>
          <Typist
            cursor={{ hideWhenDone: true }}
            onTypingDone={() => setIsTyping(false)}
          >
            <RoomRoundedIcon fontSize="large" />
            <span style={{ fontSize: "18px" }}>
              Was ist die Postleitzahl deines Wohnortes ?
            </span>
          </Typist>
        </span>
      </div>

      <div>
        {response ? (
          <Response
            response={response}
            setIsEditing={setIsEditing}
            setResponse={setResponse}
          />
        ) : (
          <VisibilityTransition isHidden={isTyping}>
            <TextField
              ref={domRef}
              onChange={onChangeHandler}
              error={isInvalidInput}
              label="PLZ"
              type="number"
              variant="outlined"
            />
          </VisibilityTransition>
        )}
      </div>
    </section>
  );
};

export default Question1;
