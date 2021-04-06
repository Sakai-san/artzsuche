import React, { FunctionComponent, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ForumIcon from "@material-ui/icons/Forum";
import LocalHospitalOutlinedIcon from "@material-ui/icons/LocalHospitalOutlined";
import LocalHospitalRoundedIcon from "@material-ui/icons/LocalHospitalRounded";
import RoomRoundedIcon from "@material-ui/icons/RoomRounded";

import ReactBotForm from "./ReactBotForm";
import Input from "./ReactBotForm/Input";
import Question from "./ReactBotForm/Question";
import { physiciansOperations } from "./ducks/physicians";
import { cantonsOperations } from "./ducks/cantons";

import { IPhysician } from "./ducks/physicians/types";
import { ICanton } from "./ducks/cantons/types";
import { IReduxStore } from "./ducks/reduxStore";
import { Response } from "./ReactBotForm/types";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    backgroundColor: "#FF51A1",
    minHeight: 80,
  },
  title: {
    flexGrow: 1,
  },
  question: {
    "& svg": {
      position: "relative",
      top: "6px",
    },
  },
  formVisible: {
    opacity: 1,
  },
  formHidden: {
    opacity: 0,
    transition: "opacity 2s ease-out",
    "&:after": {
      opacity: 1,
      content: `Messi vielmals`,
    },
  },
  completed: {
    display: "flex",
    width: "100vw",
    height: "calc(100vh - 80px)",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const App: FunctionComponent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [formResponses, setFormResponses] = useState<null | Record<
    string,
    Response["inputedValue"]
  >>(null);

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

      {formResponses ? (
        <div className={classes.completed}>Messi vielmals for your time !</div>
      ) : (
        <ReactBotForm
          submitHandler={(responses) => setFormResponses(responses)}
        >
          <div>
            <Question>
              <RoomRoundedIcon fontSize="large" style={{ color: "ff0000" }} />
              <span style={{ fontSize: "18px" }}>
                What kind of developer are you ?
              </span>
            </Question>
            <Input
              type="autocomplete"
              label="Speciality"
              options={[
                { language: "full stack", location: "zurich" },
                { language: "front-end", location: "tokyo" },
                { language: "back-end", location: "london" },
              ]}
              errorMessage="Please pick an option"
              doValidation={(inputedValue) => !!inputedValue}
              getOptionLabel={(option) => option.language}
            />
          </div>

          <div>
            <Question>
              <RoomRoundedIcon fontSize="large" style={{ color: "ff0000" }} />
              <span style={{ fontSize: "18px" }}>
                What technology do you have a professional experience with ?
              </span>
            </Question>
            <Input
              type="multiselect"
              label="Techos you work with"
              options={[
                { language: "javascript", techno: "react" },
                { language: "typescript", techno: "angular" },
                { language: "php", techno: "laravel" },
                { language: "python", techno: "Django" },
                { language: "Node.js", techno: "Express" },
              ]}
              errorMessage="Please pick an option"
              getOptionLabel={(option) => option.techno}
            />
          </div>

          <div>
            <Question>
              <LocalHospitalRoundedIcon
                fontSize="large"
                style={{ color: "#D52B1E" }}
              />
              <span style={{ fontSize: "18px" }}>
                Im welchem Kanton wohnst du ?
              </span>
            </Question>
            <Input
              type="autocomplete"
              label="Wähle bitte deinen Kanton"
              options={cantons}
              doValidation={(inputedValue) =>
                inputedValue ? inputedValue.length >= 1 : false
              }
              getOptionLabel={(option) => option}
            />
          </div>

          <div>
            <Question>
              <RoomRoundedIcon fontSize="large" style={{ color: "ff0000" }} />
              <span style={{ fontSize: "18px" }}>
                Was ist die Postleitzahl deines Wohnortes ?
              </span>
            </Question>
            <Input
              type="number"
              label="PLZ"
              errorMessage="4 digits"
              doValidation={(inputedValue) =>
                !!(
                  inputedValue &&
                  (inputedValue as string).match(/^[1-9][0-9]{3}$/)
                )
              }
            />
          </div>

          <div>
            <Question>
              <LocalHospitalOutlinedIcon
                fontSize="large"
                style={{ color: "#D52B1E" }}
              />
              <span style={{ fontSize: "18px" }}>
                Wähle einen Artz / eine Artzin ?
              </span>
            </Question>
            <Input
              type="autocomplete"
              label="Suche nach einem/er Artz/in"
              options={physicians}
              doValidation={(inputedValue) => !!inputedValue}
              getOptionLabel={(option) =>
                `${option?.ProductDoctorname}, ${option?.ProductDoctorCom}`
              }
            />
          </div>

          <div>
            <Question>
              <LocalHospitalOutlinedIcon
                fontSize="large"
                style={{ color: "#D52B1E" }}
              />
              <span style={{ fontSize: "18px" }}>
                Are there some pains you suffer from ?
              </span>
            </Question>
            <Input
              type="textarea"
              label="Pains you suffer from"
              errorMessage="Please enter some text"
              doValidation={(inputedValue) =>
                !!(inputedValue && inputedValue?.length >= 4)
              }
            />
          </div>

          <div>
            <Question>
              <LocalHospitalOutlinedIcon
                fontSize="large"
                style={{ color: "#D52B1E" }}
              />
              <span style={{ fontSize: "18px" }}>Something else ?</span>
            </Question>
            <Input type="textarea" label="Something else" />
          </div>
        </ReactBotForm>
      )}
    </div>
  );
};

export default App;
