import React, { FunctionComponent } from "react";
import { IStepProps } from "./StepType";
import Paper from "@material-ui/core/Paper";
import DomainRoundedIcon from "@material-ui/icons/DomainRounded";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import cantons from "../cantons.json";

const Step0: FunctionComponent<IStepProps> = ({
  response,
  setResponse,
  setCurrentStep,
  className,
}) => {
  const onChangeHandler = (e: any, value: any) => {
    setResponse(value);
    setCurrentStep(1);
  };

  return (
    <section className={className}>
      <div>
        <span>
          <DomainRoundedIcon fontSize="large" /> Im welchem Kanton wohnst du ?
        </span>
        {!response && (
          <Autocomplete
            options={cantons}
            getOptionLabel={(option: string) => option}
            style={{ width: 300 }}
            onChange={onChangeHandler}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Wähle bitte deinen Kanton"
                variant="outlined"
              />
            )}
          />
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
