import React, { FunctionComponent, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Theme, makeStyles } from "@material-ui/core";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ForumIcon from "@material-ui/icons/Forum";
import LocalHospitalOutlinedIcon from "@material-ui/icons/LocalHospitalOutlined";
import LocalHospitalRoundedIcon from "@material-ui/icons/LocalHospitalRounded";
import RoomRoundedIcon from "@material-ui/icons/RoomRounded";
import Typist from "react-typist";

import ReactCasualForm from "./Chat/ReactCasualForm";
import Question0 from "./Chat/Question0";
import Question1 from "./Chat/Question1";
import Question2 from "./Chat/Question2";
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
    "&>div:first-child": {
      width: "50%",
      borderRadius: "0px 10px 10px 10px",
      backgroundColor: "#f2f2f3",
      padding: "3px 0 14px 5px",
    },
    "&>div:nth-child(2)": {
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
        {({
          responses,
          setResponse,
          isBotTyping,
          isEditing,
          setIsEditing,
          setIsBotTyping,
          setCurrentQuestion,
        }: any) => [
          <Question0
            className={classes.question}
            key="question0"
            response={responses?.[0]}
            setResponse={setResponse(0)}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            options={cantons}
            isBotTyping={isBotTyping}
            setIsBotTyping={setIsBotTyping}
          >
            {(setIsBotTyping) => (
              <Typist
                cursor={{ hideWhenDone: true }}
                onTypingDone={() => setIsBotTyping(false)}
              >
                <LocalHospitalRoundedIcon
                  fontSize="large"
                  style={{ color: "#D52B1E" }}
                />{" "}
                <span style={{ fontSize: "18px" }}>
                  Im welchem Kanton wohnst du ?
                </span>
              </Typist>
            )}
          </Question0>,
          <Question1
            className={classes.question}
            key="question1"
            response={responses?.[1]}
            setResponse={setResponse(1)}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            isBotTyping={isBotTyping}
            setIsBotTyping={setIsBotTyping}
          >
            {(setIsBotTyping) => (
              <Typist
                cursor={{ hideWhenDone: true }}
                onTypingDone={() => setIsBotTyping(false)}
              >
                <RoomRoundedIcon fontSize="large" style={{ color: "ff0000" }} />{" "}
                <span style={{ fontSize: "18px" }}>
                  Was ist die Postleitzahl deines Wohnortes ?
                </span>
              </Typist>
            )}
          </Question1>,
          <Question2
            className={classes.question}
            key="question2"
            response={responses?.[2]}
            setResponse={setResponse(2)}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            options={physicians}
            isBotTyping={isBotTyping}
            setIsBotTyping={setIsBotTyping}
          >
            {(setIsBotTyping) => (
              <Typist
                cursor={{ hideWhenDone: true }}
                onTypingDone={() => setIsBotTyping(false)}
              >
                <LocalHospitalOutlinedIcon
                  fontSize="large"
                  style={{ color: "#D52B1E" }}
                />{" "}
                <span style={{ fontSize: "18px" }}>
                  Wähle einen Artz / eine Artzin ?
                </span>
              </Typist>
            )}
          </Question2>,
        ]}
      </ReactCasualForm>
    </div>
  );
};

export default App;
