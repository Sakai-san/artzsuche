// @ts-nocheck
import React, { FunctionComponent, useState, useEffect } from "react";

import VisibilityTransition from "./VisibilityTransition";
import Answer from "./Answer";
import useFocus from "./useFocus";

import { ISuggestionProps } from "./types";

const Suggestion: FunctionComponent<ISuggestionProps> = ({
  answer,
  isEditing,
  setAnswer,
  className,
  isBotTyping,
  children,
  isValid = (args: any) => !!args,
}) => {
  const domRef = useFocus([answer, isBotTyping]);

  const onBlur = (e: any) => {
    setAnswer(e.target.value, false);
  };

  return (
    <section>
      <div>
        {!isEditing ? (
          <Answer
            answer={answer}
            isValid={isValid(answer)}
            setAnswer={setAnswer}
          />
        ) : (
          <VisibilityTransition
            isHidden={answer === null ? false : !!isBotTyping}
          >
            {children?.({
              isValid,
              inputedValue,
              setInputedValue,
              domRef,
              onBlur,
            })}
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
