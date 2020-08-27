import React, { FunctionComponent } from "react";
import LocalHospitalRoundedIcon from "@material-ui/icons/LocalHospitalRounded";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

import Response from "./Response";

import { IPhysician } from "../ducks/physicians/types";
import { IStepProps } from "./StepType";

const Step2: FunctionComponent<IStepProps> = ({
  response,
  setResponse,
  setCurrentStep,
  className,
  options,
  isEditing,
  setIsEditing,
}) => {
  const onChangeHandler = (e: any, value: any) => {
    setResponse(`${value?.ProductDoctorname}, ${value?.ProductDoctorCom}`);
    !isEditing && setCurrentStep(2);
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
          <Response
            response={response}
            setIsEditing={setIsEditing}
            setResponse={setResponse}
          />
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
