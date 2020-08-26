import React, { FunctionComponent } from "react";
import { IStepProps } from "./StepType";
import Paper from "@material-ui/core/Paper";
import LocalHospitalRoundedIcon from "@material-ui/icons/LocalHospitalRounded";

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
          <LocalHospitalRoundedIcon fontSize="large" />
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
          <Paper style={{ padding: "20px" }}>{response}</Paper>
        </div>
      )}
    </section>
  );
};

export default Step2;
