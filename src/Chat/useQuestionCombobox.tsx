import React, { FunctionComponent, useState } from "react";
import LocalHospitalRoundedIcon from "@material-ui/icons/LocalHospitalRounded";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Typist from "react-typist";

import VisibilityTransition from "./VisibilityTransition";
import Response from "./Response";
import useFocus from "./useFocus";
import useBotIsTyping from "./useBotTyping";

import { IQuestionProps } from "./QuestionType";

interface useQuestionComboboxProps extends IQuestionProps {
  inputFieldLabel: string;
  questionSentence: string;
  onChangeHandler: (event: any, value: any) => void;
  getOptionLabel: (option: any) => string;
}

const useQuestionCombobox: FunctionComponent<useQuestionComboboxProps> = ({
  inputFieldLabel,
  questionSentence,
  onChangeHandler,
  getOptionLabel,
  response,
  setResponse,
  className,
  options,
  setIsEditing,
  setIsBotTyping,
}) => {
  const [isTyping, setIsTyping] = useState<boolean>(true);
  useBotIsTyping(isTyping, setIsBotTyping, [isTyping]);
  const domRef = useFocus([response, isTyping]);

  return (
    <section className={className}>
      <div>
        <span>
          <Typist
            cursor={{ hideWhenDone: true }}
            onTypingDone={() => setIsTyping(false)}
          >
            <LocalHospitalRoundedIcon fontSize="large" />
            <span style={{ fontSize: "18px" }}>{questionSentence}</span>
          </Typist>
        </span>
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
