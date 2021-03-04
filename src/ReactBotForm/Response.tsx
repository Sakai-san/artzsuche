// @ts-nocheck
import React, { FunctionComponent, useContext } from "react";
import Write from "./Write";
import Read from "./Read";
import { ReactBotFormContext, ReactBotFormChildContext } from "./Context";
import { ResponseProps } from "./types";

const Response: FunctionComponent<ResponseProps> = ({
  children,
  className,
  doValidation = (...args: any) => true,
}) => {
  const { responseInEdition, isBotTyping } = useContext(ReactBotFormContext);
  const { input, index } = useContext(ReactBotFormChildContext);

  return (
    <section>
      <div>
        {responseInEdition !== index && input !== undefined ? (
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
