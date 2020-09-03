import React, { FunctionComponent, useState, useRef } from "react";
import TextField from "@material-ui/core/TextField";

import VisibilityTransition from "./VisibilityTransition";
import Response from "./Response";
import useFocus from "./useFocus";

import { IQuestionProps } from "./QuestionType";

const validation = (input: string | undefined) =>
  !!(input && input.length === 4 && !input.startsWith("0"));

const Question1: FunctionComponent<IQuestionProps> = ({
  response,
  setResponse,
  className,
  setIsBotTyping,
  isBotTyping,
  children,
}) => {
  const domRef = useFocus([response, isBotTyping]);
  const [isInputValid, setIsInputValid] = useState<boolean>(false);
  const enteredZip = useRef<string>("");

  const onChangeHandler = (event: any) => {
    enteredZip.current = event.target.value;
    setIsInputValid(validation(enteredZip?.current));
  };

  const onKeyPressHandler = (event: any) => {
    if (event.key === "Enter" && isInputValid) {
      setResponse(enteredZip.current);
    }
  };

  return (
    <section className={className}>
      <div>
        <span>{children?.(setIsBotTyping)}</span>
      </div>

      <div>
        {response ? (
          <Response
            response={response}
            setResponse={setResponse}
            setIsInputValid={setIsInputValid}
          />
        ) : (
          <VisibilityTransition
            isHidden={response === null ? false : isBotTyping}
          >
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
