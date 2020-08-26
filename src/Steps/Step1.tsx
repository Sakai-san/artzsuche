import React, { FunctionComponent, useRef } from "react";
import { IStepProps } from "./StepType";

const Step1: FunctionComponent<IStepProps> = ({
  response,
  setResponse,
  setCurrentStep,
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
    <div>
      Was ist der PostAnzahl deines Standortes ?
      {!response ? (
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
      ) : (
        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{response}</div>
      )}
    </div>
  );
};

export default Step1;