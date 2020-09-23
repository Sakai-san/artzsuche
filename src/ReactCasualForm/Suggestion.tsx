import React, { FunctionComponent, useState } from "react";

import VisibilityTransition from "./VisibilityTransition";
import Answer from "./Answer";
import useFocus from "./useFocus";

import { ISuggestionProps } from "./types";

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
        {typeof answer === "string" ? (
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
              })}
            </span>
          </VisibilityTransition>
        )}
      </div>
    </section>
  );
};

export default Suggestion;
