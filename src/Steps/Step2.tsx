import React, { FunctionComponent } from "react";
import { IStepProps } from "./StepType";

const Step2: FunctionComponent<IStepProps> = ({
  response,
  setResponse,
  setCurrentStep,
}) => {
  const onChangeHandler = (e: any) => {
    setResponse(e.target.value);
    setCurrentStep(2);
  };

  return (
    <section>
      Wele deinen Artz ?
      {!response ? (
        <select onChange={onChangeHandler}>
          <option value="95224158">Praxis Gruppe Dübendorf AG</option>
          <option value="86040845">ediX Praxis Dübendorf</option>
          <option value="71603324">Aerztepraxis Kern AG</option>
        </select>
      ) : (
        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{response}</div>
      )}
    </section>
  );
};

export default Step2;
