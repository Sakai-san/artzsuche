import React, { FunctionComponent } from "react";
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
  doValidation = (...args: any) => true,
}) => {
  const domRef = useFocus([answer, isBotTyping]);

  const onBlur = (e: any) => {
    return null;
    setAnswer(e.target.value, false);
  };

  return (
    <section>
      <div>
        {!isEditing && answer !== undefined ? (
          <Answer
            answer={answer}
            doValidation={doValidation}
            setAnswer={setAnswer}
          />
        ) : (
          <VisibilityTransition isHidden={!!isBotTyping}>
            {children?.({
              doValidation,
              answer,
              setAnswer,
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
