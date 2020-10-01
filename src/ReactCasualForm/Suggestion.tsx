// @ts-nocheck
import React, { FunctionComponent, useState } from "react";

import VisibilityTransition from "./VisibilityTransition";
import Answer from "./Answer";
import useFocus from "./useFocus";

import { ISuggestionProps } from "./types";

const Suggestion: FunctionComponent<ISuggestionProps> = ({
  setHasError,
  answer,
  isEditing,
  setAnswer,
  className,
  isBotTyping,
  children,
  isValid = (args: any) => !!args,
}) => {
  console.log("answer", answer);
  const domRef = useFocus([answer, isBotTyping]);
  const [inputedValue, setInputedValue] = useState<string | null>(answer);

  const onBlur = (e: any) => {
    console.log("loose the focus");

    setAnswer(answer, false);
    if (!isValid(inputedValue)) {
      setHasError(true);
    }
  };

  return (
    <section>
      <div>
        {typeof answer === "string" && !isEditing ? (
          <Answer
            answer={answer}
            isValid={isValid(answer)}
            setAnswer={setAnswer}
          />
        ) : (
          <VisibilityTransition
            isHidden={answer === null ? false : !!isBotTyping}
          >
            <span>
              {children?.({
                isValid,
                inputedValue,
                setInputedValue,
                domRef,
                onBlur,
              })}
            </span>
          </VisibilityTransition>
        )}
      </div>
    </section>
  );
};

export default Suggestion;

/*


const Suggestion: FunctionComponent<ISuggestionProps> = ({
  answer,
  setAnswer,
  className,
  isBotTyping,
  children,
  isValid,
}) => {
  const domRef = useFocus([answer, isBotTyping]);

  const [inputedValue, setInputedValue] = useState<string | null>(null);

  return (
    <section className={className}>
      <div>
        <span>
          {children?.({
            isValid,
            inputedValue,
            setInputedValue,
            domRef,
          })}
        </span>
      </div>
    </section>
  );
};

export default Suggestion;

*/
