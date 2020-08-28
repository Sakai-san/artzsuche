import React, { FunctionComponent, useState } from "react";
import MapRoundedIcon from "@material-ui/icons/MapRounded";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Typist from "react-typist";

import Response from "./Response";
import useFocus from "./useFocus";

import { IStepProps } from "./StepType";

const Step0: FunctionComponent<IStepProps> = ({
  response,
  setResponse,
  setCurrentStep,
  className,
  options,
  isEditing,
  setIsEditing,
}) => {
  const [isTyping, setIsTyping] = useState<boolean>(true);
  const domRef = useFocus([response, isTyping]);
  const onChangeHandler = (e: any, value: any) => {
    setResponse(value);
    !isEditing && setCurrentStep(1);
  };

  return (
    <section className={className}>
      <div>
        <span>
          <Typist
            cursor={{ hideWhenDone: true }}
            onTypingDone={() => setIsTyping(false)}
          >
            <MapRoundedIcon fontSize="large" /> Im welchem Kanton wohnst du ?
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
          <Autocomplete
            options={options}
            getOptionLabel={(option: string) => option}
            style={{ width: 300, visibility: isTyping ? "hidden" : "visible" }}
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
        )}
      </div>
    </section>
  );
};

export default Step0;
