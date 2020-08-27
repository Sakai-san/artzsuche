import React, { FunctionComponent } from "react";
import { IStepProps } from "./StepType";
import Paper from "@material-ui/core/Paper";
import MapRoundedIcon from "@material-ui/icons/MapRounded";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

const Step0: FunctionComponent<IStepProps> = ({
  response,
  setResponse,
  setCurrentStep,
  className,
  options,
}) => {
  const onChangeHandler = (e: any, value: any) => {
    setResponse(value);
    setCurrentStep(1);
  };

  return (
    <section className={className}>
      <div>
        <span>
          <MapRoundedIcon fontSize="large" /> Im welchem Kanton wohnst du ?
        </span>
      </div>

      <div>
        {response ? (
          <Paper style={{ padding: "20px" }}>{response}</Paper>
        ) : (
          <Autocomplete
            options={options}
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
    </section>
  );
};

export default Step0;
