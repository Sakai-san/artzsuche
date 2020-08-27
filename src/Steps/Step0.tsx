import React, { FunctionComponent } from "react";
import Paper from "@material-ui/core/Paper";
import MapRoundedIcon from "@material-ui/icons/MapRounded";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import CreateRoundedIcon from "@material-ui/icons/CreateRounded";
import { Theme, makeStyles } from "@material-ui/core";
import { IStepProps } from "./StepType";

const useStyles = makeStyles((theme: Theme) => ({
  response: {
    display: "flex",
    alignItems: "center",
    "&> svg": {
      marginLeft: "10px",
    },
  },
}));

const Step0: FunctionComponent<IStepProps> = ({
  response,
  setResponse,
  setCurrentStep,
  className,
  options,
  isEditing,
  setIsEditing,
}) => {
  const classes = useStyles();

  const onChangeHandler = (e: any, value: any) => {
    setResponse(value);
    !isEditing && setCurrentStep(1);
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
          <div className={classes.response}>
            <Paper style={{ padding: "20px" }}>{response}</Paper>
            <CreateRoundedIcon
              fontSize="small"
              onClick={(e) => {
                setIsEditing(true);
                setResponse(null);
              }}
            />
          </div>
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
