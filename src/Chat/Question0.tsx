import React, { FunctionComponent, useState } from "react";
import MapRoundedIcon from "@material-ui/icons/MapRounded";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Typist from "react-typist";

import VisibilityTransition from "./VisibilityTransition";
import Response from "./Response";
import useFocus from "./useFocus";

import { IQuestionProps } from "./QuestionType";

const Question0: FunctionComponent<IQuestionProps> = ({
  response,
  setResponse,
  setCurrentQuestion,
  className,
  options,
  isEditing,
  setIsEditing,
}) => {
  const [isTyping, setIsTyping] = useState<boolean>(true);
  const domRef = useFocus([response, isTyping]);

  const onChangeHandler = (e: any, value: any) => {
    setResponse(value);
    !isEditing && setCurrentQuestion(1);
  };

  return (
    <section className={className}>
      <div>
        <span>
          <Typist
            cursor={{ hideWhenDone: true }}
            onTypingDone={() => setIsTyping(false)}
          >
            <MapRoundedIcon fontSize="large" />
            <span style={{ fontSize: "18px" }}>
              Im welchem Kanton wohnst du ?
            </span>
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
              getOptionLabel={(option: string) => option}
              style={{ width: 300 }}
              onChange={onChangeHandler}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Wähle bitte deinen Kanton"
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

export default Question0;
