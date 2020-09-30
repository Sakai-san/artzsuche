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
  const domRef = useFocus([answer, isBotTyping]);

  const [inputedValue, setInputedValue] = useState<string | null>(null);
  const [isLocalEditing, setIsLocalEditing] = useState<boolean>(false);

  const onBlur = (e: any) => {
    console.log("loose the focus");
    setIsLocalEditing(false);
    if (!isValid(inputedValue)) {
      setHasError(true);
    }
  };

  return (
    <section>
      <div>
        {!isLocalEditing ? (
          <Answer
            answer={inputedValue}
            isValid={isValid(inputedValue)}
            setAnswer={setAnswer}
            setIsLocalEditing={setIsLocalEditing}
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
