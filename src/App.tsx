import React, { FunctionComponent, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Theme, makeStyles } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ForumIcon from "@material-ui/icons/Forum";
import LocalHospitalOutlinedIcon from "@material-ui/icons/LocalHospitalOutlined";
import LocalHospitalRoundedIcon from "@material-ui/icons/LocalHospitalRounded";
import RoomRoundedIcon from "@material-ui/icons/RoomRounded";

import ReactBotForm from "./ReactBotForm";
import Question from "./ReactBotForm/Question";
import Response from "./ReactBotForm/Response";
import { physiciansOperations } from "./ducks/physicians";
import { cantonsOperations } from "./ducks/cantons";

import { IPhysician } from "./ducks/physicians/types";
import { ICanton } from "./ducks/cantons/types";
import { IReduxStore } from "./ducks/reduxStore";

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    backgroundColor: "#FF51A1",
    minHeight: 80,
  },
  title: {
    flexGrow: 1,
  },
  question: {
    display: "flex",
    flexDirection: "column",
    "& > *:first-child": {
      borderRadius: "0px 10px 10px 10px",
      backgroundColor: "#f2f2f3",
      padding: "3px 0 14px 5px",
    },
    "& > *:nth-child(2)": {
      marginTop: "15px",
      marginLeft: "auto",
    },
    "& svg": {
      position: "relative",
      top: "6px",
    },
  },
}));

const App: FunctionComponent = () => {
  const classes = useStyles({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(physiciansOperations.fetchPhysicians());
    dispatch(cantonsOperations.fetchCantons());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const physicians: IPhysician[] = useSelector(
    (state: IReduxStore) => state.physicians
  );
  const cantons: ICanton[] = useSelector((state: IReduxStore) => state.cantons);

  return (
    <div>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" className={classes.title}>
            Lass uns diskutieren
          </Typography>
          <ForumIcon fontSize="large" />
        </Toolbar>
      </AppBar>

      <ReactBotForm>
        <section className={classes.question}>
          <Question>
            <LocalHospitalRoundedIcon
              fontSize="large"
              style={{ color: "#D52B1E" }}
            />
            <span style={{ fontSize: "18px" }}>
              Im welchem Kanton wohnst du ?
            </span>
          </Question>
          <Response
            doValidation={(input: string | undefined) =>
              input ? input.length >= 1 : false
            }
          >
            {({ domRef, onBlur, doValidation, setAnswer }) => (
              <Autocomplete
                options={cantons}
                getOptionLabel={(option) => option}
                style={{ width: 300 }}
                onChange={(e, value) =>
                  setAnswer(value, doValidation(value), false)
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    ref={domRef}
                    label="Wähle bitte deinen Kanton"
                    variant="outlined"
                    inputProps={{
                      ...params.inputProps,
                      onBlur,
                    }}
                  />
                )}
              />
            )}
          </Response>
        </section>
        <section className={classes.question}>
          <Question>
            <LocalHospitalOutlinedIcon
              fontSize="large"
              style={{ color: "#D52B1E" }}
            />
            <span style={{ fontSize: "18px" }}>
              Why do you apply to our company ?
            </span>
          </Question>
          <Response
            doValidation={(input: string | undefined) =>
              !!(input && input?.length >= 4)
            }
          >
            {({ doValidation, answer, domRef, onBlur, setAnswer }) => (
              <TextField
                value={answer}
                helperText={
                  !answer &&
                  doValidation(answer) && (
                    <button
                      onClick={(event) => {
                        setAnswer(answer, true, false);
                      }}
                    >
                      continue
                    </button>
                  )
                }
                onChange={(event: any) =>
                  setAnswer(
                    event.target.value,
                    doValidation(event.target.value),
                    true
                  )
                }
                error={!doValidation(answer)}
                label="Why you apply"
                type="text"
                multiline={true}
                variant="outlined"
                ref={domRef}
                inputProps={{ onBlur }}
              />
            )}
          </Response>
        </section>
        <section className={classes.question}>
          <Question>
            <RoomRoundedIcon fontSize="large" style={{ color: "ff0000" }} />{" "}
            <span style={{ fontSize: "18px" }}>
              Was ist die Postleitzahl deines Wohnortes ?
            </span>
          </Question>
          <Response
            doValidation={(input: string | undefined) =>
              !!(input && input.match(/^[1-9][0-9]{3}$/))
            }
          >
            {({ doValidation, answer, domRef, onBlur, setAnswer }) => (
              <TextField
                helperText={
                  (answer !== undefined &&
                    !doValidation(answer) &&
                    "4 digits") ||
                  ""
                }
                onChange={(event: any) => {
                  setAnswer(
                    event.target.value,
                    doValidation(event.target.value),
                    true
                  );
                }}
                error={!doValidation(answer)}
                label="PLZ"
                type="number"
                variant="outlined"
                ref={domRef}
                inputProps={{ onBlur }}
              />
            )}
          </Response>
        </section>
        <section className={classes.question}>
          <Question>
            <LocalHospitalOutlinedIcon
              fontSize="large"
              style={{ color: "#D52B1E" }}
            />
            <span style={{ fontSize: "18px" }}>
              Wähle einen Artz / eine Artzin ?
            </span>
          </Question>
          <Response doValidation={(input: string | undefined) => !!input}>
            {({ domRef, onBlur, doValidation, setAnswer }) => (
              <Autocomplete
                options={physicians}
                getOptionLabel={(option) =>
                  `${option?.ProductDoctorname}, ${option?.ProductDoctorCom}` ||
                  ""
                }
                style={{ width: 300 }}
                onChange={(e, value) =>
                  setAnswer?.(
                    `${value?.ProductDoctorname}, ${value?.ProductDoctorCom}`,
                    doValidation(value),
                    false
                  )
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    ref={domRef}
                    label="Suche nach einem/er Artz/in"
                    variant="outlined"
                    inputProps={{
                      ...params.inputProps,
                      onBlur,
                    }}
                  />
                )}
              />
            )}
          </Response>
        </section>
      </ReactBotForm>
    </div>
  );
};

export default App;
