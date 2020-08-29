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
  isTypingBot: boolean;
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
  isTypingBot,
}) => {
  useBotIsTyping(isTypingBot, setIsBotTyping, [isTypingBot]);
  const domRef = useFocus([response, isTypingBot]);

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
          <VisibilityTransition isHidden={isTypingBot}>
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
