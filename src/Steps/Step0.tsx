import React, { FunctionComponent } from "react";
import { IStepProps } from "./StepType";
import Paper from "@material-ui/core/Paper";

const Step0: FunctionComponent<IStepProps> = ({
  response,
  setResponse,
  setCurrentStep,
  className,
}) => {
  const onChangeHandler = (e: any) => {
    setResponse(e.target.value);
    setCurrentStep(1);
  };

  return (
    <section className={className}>
      <div>
        <span>Im weles Kanton wohnst du ?</span>
        {!response && (
          <select onChange={onChangeHandler}>
            <option value="zug">Zug</option>
            <option value="zuerich">Zuerich</option>
            <option value="stgallen">St. Gallen</option>
          </select>
        )}
      </div>

      {response && (
        <div>
          <Paper>{response}</Paper>
        </div>
      )}
    </section>
  );
};

export default Step0;
