// @ts-nocheck
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
import Typist from "react-typist";

import ReactCasualForm from "./ReactCasualForm";
import Suggestion from "./ReactCasualForm/Suggestion";
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

      <ReactCasualForm>
        {[
          ({
            setHasError,
            answer,
            isEditing,
            setAnswer,
            isBotTyping,
            setIsBotTyping,
          }) => (
            <section className={classes.question} key="question0">
              <Typist
                cursor={{ hideWhenDone: true }}
                onTypingDone={() => setIsBotTyping?.(false)}
              >
                <LocalHospitalRoundedIcon
                  fontSize="large"
                  style={{ color: "#D52B1E" }}
                />{" "}
                <span style={{ fontSize: "18px" }}>
                  Im welchem Kanton wohnst du ?
                </span>
              </Typist>
              <Suggestion
                answer={answer}
                isEditing={isEditing}
                setAnswer={setAnswer}
                isBotTyping={isBotTyping}
                setHasError={setHasError}
                isValid={(input: string | undefined) => input?.length >= 1}
              >
                {({ isValid, setInputedValue, domRef, onBlur }) => (
                  <Autocomplete
                    options={cantons}
                    getOptionLabel={(option) => option}
                    style={{ width: 300 }}
                    onChange={(e, value) => setAnswer(value, false)}
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
              </Suggestion>
            </section>
          ),

          ({
            setHasError,
            answer,
            isEditing,
            setAnswer,
            isBotTyping,
            setIsBotTyping,
          }) => (
            <section className={classes.question} key="question1">
              <Typist
                cursor={{ hideWhenDone: true }}
                onTypingDone={() => setIsBotTyping?.(false)}
              >
                <LocalHospitalOutlinedIcon
                  fontSize="large"
                  style={{ color: "#D52B1E" }}
                />{" "}
                <span style={{ fontSize: "18px" }}>
                  Why do you apply to our company ?
                </span>
              </Typist>
              <Suggestion
                answer={answer}
                isEditing={isEditing}
                setAnswer={setAnswer}
                isBotTyping={isBotTyping}
                isValid={(input: string | undefined) =>
                  !!(input && input?.length >= 4)
                }
                setHasError={setHasError}
              >
                {({
                  isValid,
                  inputedValue,
                  setInputedValue,
                  domRef,
                  onBlur,
                }) => (
                  <TextField
                    value={answer}
                    // is not already set
                    helperText={
                      !answer &&
                      isValid(inputedValue) && (
                        <button
                          onClick={(e) => {
                            setAnswer(answer, false);
                          }}
                        >
                          continue
                        </button>
                      )
                    }
                    onChange={(event: any) =>
                      setAnswer(event.target.value, true)
                    }
                    error={!isValid(inputedValue)}
                    label="Why you apply"
                    type="text"
                    multiline={true}
                    variant="outlined"
                    ref={domRef}
                    inputProps={{
                      onBlur,
                    }}
                  />
                )}
              </Suggestion>
            </section>
          ),

          ({
            setHasError,
            answer,
            isEditing,
            setAnswer,
            isBotTyping,
            setIsBotTyping,
          }) => (
            <section className={classes.question} key="question2">
              <Typist
                cursor={{ hideWhenDone: true }}
                onTypingDone={() => setIsBotTyping?.(false)}
              >
                <RoomRoundedIcon fontSize="large" style={{ color: "ff0000" }} />{" "}
                <span style={{ fontSize: "18px" }}>
                  Was ist die Postleitzahl deines Wohnortes ?
                </span>
              </Typist>
              <Suggestion
                answer={answer}
                isEditing={isEditing}
                setAnswer={setAnswer}
                isBotTyping={isBotTyping}
                isValid={(input: string | undefined) =>
                  !!(input?.length === 4 && !input.match("(-1|0).*"))
                }
                setHasError={setHasError}
              >
                {({ isValid, inputedValue, domRef, onBlur }) => (
                  <TextField
                    helperText={
                      (isValid(inputedValue) && "Bitte schluss Enter") || ""
                    }
                    onChange={(event: any) =>
                      setAnswer(event.target.value, true)
                    }
                    onKeyPress={(event: any) => {
                      if (event.key === "Enter") {
                        setAnswer?.(inputedValue, false);
                      }
                    }}
                    error={!isValid(inputedValue)}
                    label="PLZ"
                    type="number"
                    variant="outlined"
                    ref={domRef}
                    inputProps={{
                      onBlur,
                    }}
                  />
                )}
              </Suggestion>
            </section>
          ),

          ({
            setHasError,
            answer,
            isEditing,
            setAnswer,
            isBotTyping,
            setIsBotTyping,
          }) => (
            <section className={classes.question} key="question3">
              <Typist
                cursor={{ hideWhenDone: true }}
                onTypingDone={() => setIsBotTyping?.(false)}
              >
                <LocalHospitalOutlinedIcon
                  fontSize="large"
                  style={{ color: "#D52B1E" }}
                />{" "}
                <span style={{ fontSize: "18px" }}>
                  Wähle einen Artz / eine Artzin ?
                </span>
              </Typist>
              <Suggestion
                answer={answer}
                isEditing={isEditing}
                setAnswer={setAnswer}
                isBotTyping={isBotTyping}
                setHasError={setHasError}
                isValid={(input: string | undefined) =>
                  !!(input && input?.length >= 1)
                }
              >
                {({ domRef, onBlur }) => (
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
              </Suggestion>
            </section>
          ),
        ]}
      </ReactCasualForm>
    </div>
  );
};

export default App;
