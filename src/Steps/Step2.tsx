import React, { FunctionComponent } from "react";
import LocalHospitalRoundedIcon from "@material-ui/icons/LocalHospitalRounded";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Typist from "react-typist";

import Response from "./Response";
import useFocus from "./useFocus";

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
  const domRef = useFocus([response]);

  const onChangeHandler = (e: any, value: any) => {
    setResponse(`${value?.ProductDoctorname}, ${value?.ProductDoctorCom}`);
    !isEditing && setCurrentStep(2);
  };

  return (
    <section className={className}>
      <div>
        <span>
          <LocalHospitalRoundedIcon fontSize="large" />
          <Typist cursor={{ hideWhenDone: true }}>
            Wähle einen Artz / eine Artzin ?
          </Typist>
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
                ref={domRef}
              />
            )}
          />
        )}
      </div>
    </section>
  );
};

export default Step2;
