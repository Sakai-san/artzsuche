import React, { FunctionComponent } from "react";
import { IStepProps } from "./StepType";
import Paper from "@material-ui/core/Paper";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";

const Step2: FunctionComponent<IStepProps> = ({
  response,
  setResponse,
  setCurrentStep,
  className,
}) => {
  const onChangeHandler = (e: any) => {
    setResponse(e.target.value);
    setCurrentStep(2);
  };

  return (
    <section className={className}>
      <div>
        <span>
          <LocalHospitalIcon fontSize="large" />
          Wähle deinen Artz ?
        </span>
        {!response && (
          <select onChange={onChangeHandler}>
            <option value="95224158">Praxis Gruppe Dübendorf AG</option>
            <option value="86040845">ediX Praxis Dübendorf</option>
            <option value="71603324">Aerztepraxis Kern AG</option>
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

export default Step2;
