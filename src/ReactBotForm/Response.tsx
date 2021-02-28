// @ts-nocheck
import React, { FunctionComponent, useContext } from "react";
import VisibilityTransition from "./VisibilityTransition";
import Answer from "./Answer";
import { ReactBotFormContext, ReactBotFormChildContext } from "./Context";
import useFocus from "./useFocus";

import { ResponseProps } from "./types";

const Response: FunctionComponent<ResponseProps> = ({
  children,
  className,
  doValidation = (...args: any) => true,
}) => {
  const { isBotTyping } = useContext(ReactBotFormContext);
  const { answer, setAnswer, isEditing } = useContext(ReactBotFormChildContext);

  const domRef = useFocus([answer, isBotTyping]);

  const onBlur = (e: any) => {
    return null;
    setAnswer(e.target.value, false);
  };

  return (
    <section>
      <div>
        {!isEditing && answer !== undefined ? (
          <Answer doValidation={doValidation} />
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
