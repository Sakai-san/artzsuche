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
import In from "./ReactBotForm/Input";
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
      <div>
        <option></option>
      </div>
      {formResponses ? (
        <div className={classes.completed}>Messi vielmals for your time !</div>
      ) : (
        <ReactBotForm
          submitHandler={(responses) => setFormResponses(responses)}
        >
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
            <In
              type="autocomplete"
              options={cantons}
              doValidation={(inputedValue: string) =>
                inputedValue ? inputedValue.length >= 1 : false
              }
              getOptionLabel={(option: string) => option}
              label="Wähle bitte deinen Kanton"
            />
          </div>

          <div>
            <Question>
              <RoomRoundedIcon fontSize="large" style={{ color: "ff0000" }} />
              <span style={{ fontSize: "18px" }}>
                Was ist die Postleitzahl deines Wohnortes ?
              </span>
            </Question>
            <In
              type="number"
              errorMessage="4 digits"
              doValidation={(inputedValue: string) =>
                !!(inputedValue && inputedValue.match(/^[1-9][0-9]{3}$/))
              }
              label="PLZ"
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
            <In
              type="autocomplete"
              options={physicians}
              doValidation={(inputedValue: string) => !!inputedValue}
              getOptionLabel={(option) =>
                `${option?.ProductDoctorname}, ${option?.ProductDoctorCom}`
              }
              label="Suche nach einem/er Artz/in"
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
            <In
              type="textarea"
              errorMessage="Please enter some text"
              doValidation={(inputedValue: string) =>
                !!(inputedValue && inputedValue?.length >= 4)
              }
              label="Pains you suffer from"
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
            <In type="textarea" label="Something else" />
          </div>
        </ReactBotForm>
      )}
    </div>
  );
};

export default App;
