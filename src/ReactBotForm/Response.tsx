// @ts-nocheck
import React, { FunctionComponent, useContext } from "react";
import Write from "./Write";
import Read from "./Read";
import { ReactBotFormContext, ReactBotFormChildContext } from "./Context";
import useFocus from "./useFocus";
import { ResponseProps } from "./types";

const Response: FunctionComponent<ResponseProps> = ({
  children,
  className,
  doValidation = (...args: any) => true,
}) => {
  const { isBotTyping } = useContext(ReactBotFormContext);
  const { input, setInput, isEditing } = useContext(ReactBotFormChildContext);

  const domRef = useFocus([input, isBotTyping]);

  const onBlur = (e: any) => {
    return null;
    setInput(e.target.value, false);
  };

  return (
    <section>
      <div>
        {!isEditing && input !== undefined ? (
          <Read doValidation={doValidation} />
        ) : (
          <Write doValidation={doValidation} isHidden={!!isBotTyping}>
            {children}
          </Write>
        )}
      </div>
    </section>
  );
};

export default Response;
