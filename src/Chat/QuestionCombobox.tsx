// @ts-nocheck
import React, { FunctionComponent, ReactElement } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

import VisibilityTransition from "./VisibilityTransition";
import Response from "./Response";
import useFocus from "./useFocus";

import { IQuestionProps } from "./QuestionType";

interface useQuestionComboboxProps extends IQuestionProps {
  inputFieldLabel: string;
  onChangeHandler: (event: any, value: any) => void;
  getOptionLabel: (option: any) => string;
  isTypingBot: boolean;
  questionSentenceComponent: ReactElement;
}

const QuestionCombobox: FunctionComponent<any> = ({
  inputFieldLabel,
  onChangeHandler,
  getOptionLabel,
  response,
  setResponse,
  className,
  options,
  setIsEditing,
  isBotTyping,
  setIsBotTyping,
  children,
}) => {
  const domRef = useFocus([response, isBotTyping]);

  return (
    <section className={className}>
      <div>
        <span>{children?.(setIsBotTyping)}</span>
      </div>

      <div>
        {response ? (
          <Response
            response={response}
            setIsEditing={setIsEditing}
            setResponse={setResponse}
          />
        ) : (
          <VisibilityTransition isHidden={isBotTyping}>
            <Autocomplete
              options={options}
              getOptionLabel={getOptionLabel}
              style={{ width: 300 }}
              onChange={onChangeHandler}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={inputFieldLabel}
                  variant="outlined"
                  ref={domRef}
                />
              )}
            />
          </VisibilityTransition>
        )}
      </div>
    </section>
  );
};

export default QuestionCombobox;
