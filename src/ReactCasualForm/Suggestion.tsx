// @ts-nocheck
import React, { FunctionComponent, useState, useEffect } from "react";

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
  const domRef = useFocus([answer, isBotTyping]);
  const [inputedValue, setInputedValue] = useState<string | null>(answer);

  useEffect(() => {
    if (!isValid(inputedValue)) {
      setHasError?.(true);
    } else {
      setHasError?.(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputedValue]);

  const onBlur = (e: any) => {
    const inputValue = e.target.value;
    setInputedValue(inputValue);
    setAnswer(inputedValue, false);
  };

  return (
    <section>
      <div>
        {inputedValue !== undefined && !isEditing ? (
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
