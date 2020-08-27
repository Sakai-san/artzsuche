import React, { FunctionComponent, useState } from "react";
import { IStepProps } from "./StepType";
import Paper from "@material-ui/core/Paper";
import RoomRoundedIcon from "@material-ui/icons/RoomRounded";
import TextField from "@material-ui/core/TextField";

const validation = (input: string | undefined) =>
  input && input.length === 4 && !input.startsWith("0");

const Step1: FunctionComponent<IStepProps> = ({
  response,
  setResponse,
  setCurrentStep,
  className,
}) => {
  const [isInvalidInput, setInvalidInput] = useState<boolean>(false);

  const onChangeHandler = (event: any) => {
    const enteredZip = event.target.value;

    if (!validation(enteredZip)) {
      setInvalidInput(true);
    } else {
      setInvalidInput(false);

      setTimeout(() => {
        setResponse(enteredZip);
        setCurrentStep(2);
      }, 2000);
    }
  };

  return (
    <section className={className}>
      <div>
        <span>
          <RoomRoundedIcon fontSize="large" /> Was ist die Postleitzahl deines
          Wohnortes ?
        </span>
      </div>

      <div>
        {response ? (
          <Paper style={{ padding: "20px" }}>{response}</Paper>
        ) : (
          <TextField
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
