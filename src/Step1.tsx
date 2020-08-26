import React, { FunctionComponent, useRef } from "react";

interface Step1Props {
  response?: string;
  setResponse: (response: string) => void;
  setCurrentStep: (step: number) => void;
}

const Step1: FunctionComponent<Step1Props> = ({
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
