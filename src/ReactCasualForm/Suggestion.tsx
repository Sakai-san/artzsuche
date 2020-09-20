import React, { FunctionComponent, useState } from "react";

import VisibilityTransition from "./VisibilityTransition";
import Response from "./Response";
import useFocus from "./useFocus";

import { ISuggestionProps } from "./types";

const Suggestion: FunctionComponent<ISuggestionProps> = ({
  response,
  setResponse,
  className,
  isBotTyping,
  children,
  isValid,
}) => {
  const domRef = useFocus([response, isBotTyping]);

  const [inputedValue, setInputedValue] = useState<string | null>(null);

  return (
    <section className={className}>
      <div>
        {response ? (
          <Response response={response} setResponse={setResponse} />
        ) : (
          <VisibilityTransition
            isHidden={response === null ? false : !!isBotTyping}
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
