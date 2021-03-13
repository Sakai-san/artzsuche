import React, { FunctionComponent, useContext } from "react";
import Write from "./Write";
import Read from "./Read";
import { ReactBotFormContext, ReactBotFormChildContext } from "./Context";
import { ResponseProps } from "./types";

const Response: FunctionComponent<ResponseProps> = ({
  children,
  className,
  doValidation,
}) => {
  const { responseInEdition, isBotTyping } = useContext(ReactBotFormContext);
  const { isValid, index } = useContext(ReactBotFormChildContext);

  return (
    <section>
      <div>
        {responseInEdition !== index && isValid !== undefined ? (
          <Read doValidation={doValidation} />
        ) : (
          !isBotTyping && <Write doValidation={doValidation}>{children}</Write>
        )}
      </div>
    </section>
  );
};

export default Response;
