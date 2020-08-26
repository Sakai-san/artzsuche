import React, { FunctionComponent, useRef, useState } from "react";
import { IStepProps } from "./StepType";
import Paper from "@material-ui/core/Paper";
import RoomRoundedIcon from "@material-ui/icons/RoomRounded";
import TextField from "@material-ui/core/TextField";

const Step1: FunctionComponent<IStepProps> = ({
  response,
  setResponse,
  setCurrentStep,
  className,
}) => {
  const isError = useRef<boolean | null>(null);
  const [isInvalidInput, setInvalidInput] = useState<boolean>(false);

  const validation = (input: any) =>
    input && input.length === 4 && !input.startsWith("0");

  const onChangeHandler = (event: any) => {
    const enteredZip = event.target.value;

    if (!validation(enteredZip)) {
      setInvalidInput(true);
    } else {
      setInvalidInput(false);
      setResponse(enteredZip);
      setCurrentStep(2);
    }
  };

  return (
    <section className={className}>
      <div>
        <span>
          <RoomRoundedIcon fontSize="large" /> Was ist die Postleitzahl deines
          Wohnortes ?
        </span>

        {!response && (
          <TextField
            onChange={onChangeHandler}
            error={isInvalidInput}
            label="PLZ"
            type="number"
            variant="outlined"
          />
        )}
      </div>

      {response && (
        <div>
          <Paper style={{ padding: "20px" }}>{response}</Paper>
        </div>
      )}
    </section>
  );
};

export default Step1;
