import React, { FunctionComponent, useContext } from "react";
import VisibilityTransition from "./VisibilityTransition";
import Answer from "./Answer";
import { ReactBotFormContext } from "./ReactBotFormContext";
import useFocus from "./useFocus";

import { ResponseProps } from "./types";

const Response: FunctionComponent<ResponseProps> = ({
  answer,
  setAnswer,
  isBotTyping,
  children,
  isEditing,
  className,
  doValidation = (...args: any) => true,
}) => {
  const context = useContext(ReactBotFormContext);
  const domRef = useFocus([answer, isBotTyping]);

  const onBlur = (e: any) => {
    return null;
    setAnswer(e.target.value, false);
  };

  return (
    <section>
      <div>
        {
          // @ts-ignore
          context?.thomas?.()
        }
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

export default Response;
