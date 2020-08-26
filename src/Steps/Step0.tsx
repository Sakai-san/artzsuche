import React, { FunctionComponent } from "react";
import { IStepProps } from "./StepType";
import Paper from "@material-ui/core/Paper";
import DomainRoundedIcon from "@material-ui/icons/DomainRounded";

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
        <span>
          <DomainRoundedIcon fontSize="large" /> Im welchem Kanton wohnst du ?
        </span>
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
          <Paper style={{ padding: "20px" }}>{response}</Paper>
        </div>
      )}
    </section>
  );
};

export default Step0;
