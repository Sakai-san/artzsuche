import React, { FunctionComponent } from "react";
import { IStepProps } from "./StepType";
import Paper from "@material-ui/core/Paper";
import LocalHospitalRoundedIcon from "@material-ui/icons/LocalHospitalRounded";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { IPhysician } from "../types/phyisician";

const Step2: FunctionComponent<IStepProps> = ({
  response,
  setResponse,
  setCurrentStep,
  className,
  options,
}) => {
  const onChangeHandler = (e: any, value: any) => {
    setResponse(`${value?.ProductDoctorname}, ${value?.ProductDoctorCom}`);
    setCurrentStep(2);
  };

  return (
    <section className={className}>
      <div>
        <span>
          <LocalHospitalRoundedIcon fontSize="large" /> Wähle einen Artz / eine
          Artzin ?
        </span>
      </div>

      <div>
        {response ? (
          <Paper style={{ padding: "20px" }}>{response}</Paper>
        ) : (
          <Autocomplete
            options={options}
            getOptionLabel={(option: IPhysician) =>
              `${option?.ProductDoctorname}, ${option?.ProductDoctorCom}` || ""
            }
            style={{ width: 300 }}
            onChange={onChangeHandler}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Suche nach einem/er Artz/in"
                variant="outlined"
              />
            )}
          />
        )}
      </div>
    </section>
  );
};

export default Step2;
