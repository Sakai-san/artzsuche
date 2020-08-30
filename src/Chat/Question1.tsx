import React, { FunctionComponent, useState, useRef } from "react";
import RoomRoundedIcon from "@material-ui/icons/RoomRounded";
import TextField from "@material-ui/core/TextField";
import Typist from "react-typist";

import VisibilityTransition from "./VisibilityTransition";
import Response from "./Response";
import useFocus from "./useFocus";
import useBotIsTyping from "./useBotTyping";

import { IQuestionProps } from "./QuestionType";

const validation = (input: string | undefined) =>
  !!(input && input.length === 4 && !input.startsWith("0"));

const Question1: FunctionComponent<IQuestionProps> = ({
  response,
  setResponse,
  setCurrentQuestion,
  className,
  isEditing,
  setIsEditing,
  setIsBotTyping,
}) => {
  const [isTyping, setIsTyping] = useState<boolean>(true);
  useBotIsTyping(isTyping, setIsBotTyping, [isTyping]);
  const domRef = useFocus([response, isTyping]);
  const [isInputValid, setIsInputValid] = useState<boolean>(false);
  const enteredZip = useRef<string>("");

  const onChangeHandler = (event: any) => {
    enteredZip.current = event.target.value;
    setIsInputValid(validation(enteredZip?.current));
  };

  const onKeyPressHandler = (event: any) => {
    if (event.key === "Enter" && isInputValid) {
      setResponse(enteredZip.current);
      !isEditing && setCurrentQuestion(2);
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
            <RoomRoundedIcon fontSize="large" style={{ color: "ff0000" }} />{" "}
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
            setIsInputValid={setIsInputValid}
          />
        ) : (
          <VisibilityTransition isHidden={isTyping}>
            <TextField
              helperText={(isInputValid && "Bitte schluss Enter") || ""}
              ref={domRef}
              onChange={onChangeHandler}
              onKeyPress={onKeyPressHandler}
              error={!isInputValid}
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
