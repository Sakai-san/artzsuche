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
    return null;
    setAnswer(e.target.value, false);
  };

  console.log("isBotTyping", isBotTyping);

  return (
    <section>
      <div>
        {!isEditing && answer !== undefined ? (
          <Answer
            answer={answer}
            isValid={isValid(answer)}
            setAnswer={setAnswer}
          />
        ) : (
          <VisibilityTransition isHidden={!!isBotTyping}>
            {children?.({
              isValid,
              inputedValue: answer,
              setInputedValue: setAnswer,
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
