import React, { FunctionComponent } from "react";

interface Step0Props {
  response: string | null;
  setResponse: (response: string) => void;
  setCurrentStep: (step: number) => void;
}

const Step0: FunctionComponent<Step0Props> = ({
  response,
  setResponse,
  setCurrentStep,
}) => {
  const onChangeHandler = (e: any) => {
    setResponse(e.target.value);
    setCurrentStep(1);
  };

  return (
    <div>
      Im weles Kanton wohnst du ?
      {!response ? (
        <select onChange={onChangeHandler}>
          <option value="zug">Zug</option>
          <option value="zuerich">Zuerich</option>
          <option value="stgallen">St. Gallen</option>
        </select>
      ) : (
        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{response}</div>
      )}
    </div>
  );
};

export default Step0;
