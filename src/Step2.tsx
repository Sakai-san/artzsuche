import React, { FunctionComponent } from "react";

interface Step0Props {
  response: string | null;
  setResponse: (response: string) => void;
  setCurrentStep: (step: number) => void;
}

const Step2: FunctionComponent<Step0Props> = ({
  response,
  setResponse,
  setCurrentStep,
}) => {
  const onChangeHandler = (e: any) => {
    setResponse(e.target.value);
    setCurrentStep(2);
  };

  return (
    <div>
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
    </div>
  );
};

export default Step2;
