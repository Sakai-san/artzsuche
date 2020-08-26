import React, { FunctionComponent } from "react";
import { IStepProps } from "./StepType";
import Paper from "@material-ui/core/Paper";

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
      <div>Im weles Kanton wohnst du ?</div>
      {!response ? (
        <select onChange={onChangeHandler}>
          <option value="zug">Zug</option>
          <option value="zuerich">Zuerich</option>
          <option value="stgallen">St. Gallen</option>
        </select>
      ) : (
        <Paper>{response}</Paper>
      )}
    </section>
  );
};

export default Step0;
