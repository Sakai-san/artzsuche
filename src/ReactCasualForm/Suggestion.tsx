// @ts-nocheck
import React, { FunctionComponent, useState } from "react";

import VisibilityTransition from "./VisibilityTransition";
import Answer from "./Answer";
import useFocus from "./useFocus";

import { ISuggestionProps } from "./types";

const tap = (f) => (mutation) => (value) => {
  mutation(value);
  f();
};

const Suggestion: FunctionComponent<ISuggestionProps> = ({
  answer,
  isEditing,
  setAnswer,
  className,
  isBotTyping,
  children,
  isValid = (args: any) => null,
}) => {
  const domRef = useFocus([answer, isBotTyping]);

  const [inputedValue, setInputedValue] = useState<string | null>(null);
  const [isBlurred, setIsBlurred] = useState<boolean>(false);

  const onBlur = (isInputValid: Function) => (e: any) => {
    if (isInputValid(answer)) {
    } else {
      setHasError(true);
    }
  };

  const onBlurDecoration = tap(onBlur(isValid))(isBlurred)(true);

  return (
    <section>
      <div>
        {typeof answer === "string" && !isEditing ? (
          <Answer answer={answer} setAnswer={setAnswer} />
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
                onBlur: onBlurDecoration,
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
