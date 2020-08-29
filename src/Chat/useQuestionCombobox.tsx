import React, { FunctionComponent, ReactElement } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

import VisibilityTransition from "./VisibilityTransition";
import Response from "./Response";
import useFocus from "./useFocus";
import useBotIsTyping from "./useBotTyping";

import { IQuestionProps } from "./QuestionType";

interface useQuestionComboboxProps extends IQuestionProps {
  inputFieldLabel: string;
  onChangeHandler: (event: any, value: any) => void;
  getOptionLabel: (option: any) => string;
  isTyping: boolean;
  questionSentenceComponent: ReactElement;
}

const useQuestionCombobox: FunctionComponent<useQuestionComboboxProps> = ({
  inputFieldLabel,
  onChangeHandler,
  getOptionLabel,
  response,
  setResponse,
  className,
  options,
  setIsEditing,
  setIsBotTyping,
  questionSentenceComponent,
  isTyping,
}) => {
  useBotIsTyping(isTyping, setIsBotTyping, [isTyping]);
  const domRef = useFocus([response, isTyping]);

  return (
    <section className={className}>
      <div>
        <span>{questionSentenceComponent}</span>
      </div>

      <div>
        {response ? (
          <Response
            response={response}
            setIsEditing={setIsEditing}
            setResponse={setResponse}
          />
        ) : (
          <VisibilityTransition isHidden={isTyping}>
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

export default useQuestionCombobox;
