import React, { FunctionComponent, useState } from "react";
import { IStepProps } from "./StepType";
import RoomRoundedIcon from "@material-ui/icons/RoomRounded";
import TextField from "@material-ui/core/TextField";
import Typist from "react-typist";

import Response from "./Response";
import useFocus from "./useFocus";

const validation = (input: string | undefined) =>
  input && input.length === 4 && !input.startsWith("0");

const Step1: FunctionComponent<IStepProps> = ({
  response,
  setResponse,
  setCurrentStep,
  className,
  isEditing,
  setIsEditing,
}) => {
  const domRef = useFocus([response]);
  const [isInvalidInput, setInvalidInput] = useState<boolean>(false);

  const onChangeHandler = (event: any) => {
    const enteredZip = event.target.value;

    if (!validation(enteredZip)) {
      setInvalidInput(true);
    } else {
      setInvalidInput(false);

      setTimeout(() => {
        setResponse(enteredZip);
        !isEditing && setCurrentStep(2);
      }, 500);
    }
  };

  return (
    <section className={className}>
      <div>
        <span>
          <RoomRoundedIcon fontSize="large" />
          <Typist>Was ist die Postleitzahl deines Wohnortes ?</Typist>
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
          <TextField
            ref={domRef}
            onChange={onChangeHandler}
            error={isInvalidInput}
            label="PLZ"
            type="number"
            variant="outlined"
          />
        )}
      </div>
    </section>
  );
};

export default Step1;
