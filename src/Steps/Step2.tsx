import React, { FunctionComponent } from "react";
import { IStepProps } from "./StepType";
import Paper from "@material-ui/core/Paper";
import LocalHospitalRoundedIcon from "@material-ui/icons/LocalHospitalRounded";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import physicians from "../physicians.json";

const Step2: FunctionComponent<IStepProps> = ({
  response,
  setResponse,
  setCurrentStep,
  className,
}) => {
  const onChangeHandler = (e: any, value: any) => {
    setResponse(`${value?.ProductDoctorname}, ${value?.ProductDoctorCom}`);
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
          <Autocomplete
            id="combo-box-physicians"
            options={physicians}
            getOptionLabel={(option: any) =>
              `${option?.ProductDoctorname}, ${option?.ProductDoctorCom}` || ""
            }
            style={{ width: 300 }}
            onChange={onChangeHandler}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Suche nach deinem Artz"
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

export default Step2;
