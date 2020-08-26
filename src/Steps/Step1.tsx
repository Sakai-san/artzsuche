import React, { FunctionComponent, useRef } from "react";
import { IStepProps } from "./StepType";
import Paper from "@material-ui/core/Paper";
import RoomRoundedIcon from "@material-ui/icons/RoomRounded";

const Step1: FunctionComponent<IStepProps> = ({
  response,
  setResponse,
  setCurrentStep,
  className,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const validation = (input: any) => input && input.length === 4;

  const onSumitHandler = (e: any) => {
    e.preventDefault();
    const enteredZip = inputRef?.current?.value;
    enteredZip && setResponse(enteredZip);
    if (!validation(enteredZip)) {
      return;
    } else {
      setCurrentStep(2);
    }
  };

  return (
    <section className={className}>
      <div>
        <span>
          <RoomRoundedIcon fontSize="large" />
          Was ist der Postanzahl deines Standortes ?
        </span>

        {!response && (
          <form onSubmit={onSumitHandler}>
            <input
              style={
                validation(inputRef?.current?.value)
                  ? {}
                  : { border: "1px solid red" }
              }
              minLength={4}
              ref={inputRef}
              type="number"
              placeholder="gib deine postanzahl ein"
            />
          </form>
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
