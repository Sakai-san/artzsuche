import React, { FunctionComponent } from "react";
import { IStepProps } from "./StepType";

const Step0: FunctionComponent<IStepProps> = ({
  response,
  setResponse,
  setCurrentStep,
}) => {
  const onChangeHandler = (e: any) => {
    setResponse(e.target.value);
    setCurrentStep(1);
  };

  return (
    <section>
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
    </section>
  );
};

export default Step0;
