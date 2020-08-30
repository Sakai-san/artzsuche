import React, { FunctionComponent, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Theme, makeStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ForumIcon from "@material-ui/icons/Forum";
import { deepOrange } from "@material-ui/core/colors";
import LocalHospitalOutlinedIcon from "@material-ui/icons/LocalHospitalOutlined";
import LocalHospitalRoundedIcon from "@material-ui/icons/LocalHospitalRounded";
import RoomRoundedIcon from "@material-ui/icons/RoomRounded";
import Typist from "react-typist";

import Question0 from "./Chat/Question0";
import Question1 from "./Chat/Question1";
import Question2 from "./Chat/Question2";
import { physiciansOperations } from "./ducks/physicians";
import { cantonsOperations } from "./ducks/cantons";

import { IPhysician } from "./ducks/physicians/types";
import { ICanton } from "./ducks/cantons/types";
import { IReduxStore } from "./ducks/reduxStore";
import typingIndicator from "./giphy.gif";

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    backgroundColor: "#FF51A1",
    minHeight: 80,
  },
  title: {
    flexGrow: 1,
  },
  content: {
    width: "90%",
    padding: "40px",
    "&>section:not(:first-child)": {
      padding: "5px",
      marginTop: "30px",
      borderRadius: "6px 6px",
    },
  },
  lanes: {
    display: "flex",
    "&>div:last-child": {
      marginLeft: "auto",
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  bot: {
    fontSize: "35px",
  },
  question: {
    display: "flex",
    flexDirection: "column",
    "&>div:nth-child(2)": {
      marginLeft: "auto",
    },
    "& svg": {
      position: "relative",
      top: "6px",
    },
  },
  typing: {
    display: "block",
    height: "50px",
    position: "relative",
    left: "10px",
    top: "-5px",
  },
}));

const App: FunctionComponent = () => {
  const classes = useStyles({});
  const [isBotTyping, setIsBotTyping] = useState<boolean>(true);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);

  const [response0, setResponse0] = useState<string | null>(null);
  const [response1, setResponse1] = useState<string | null>(null);
  const [response2, setResponse2] = useState<string | null>(null);

  const [isEditing0, setIsEditing0] = useState<boolean>(false);
  const [isEditing1, setIsEditing1] = useState<boolean>(false);
  const [isEditing2, setIsEditing2] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    // bot is typing after switching to new question
    setIsBotTyping(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestion]);

  useEffect(() => {
    dispatch(physiciansOperations.fetchPhysicians());
    dispatch(cantonsOperations.fetchCantons());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const physicians: IPhysician[] = useSelector(
    (state: IReduxStore) => state.physicians
  );
  const cantons: ICanton[] = useSelector((state: IReduxStore) => state.cantons);

  const isDiscussionOver =
    [response0, response1, response2].indexOf(null) === -1;

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

      <div className={classes.content}>
        <section className={classes.lanes}>
          <div>
            <img
              style={{ visibility: isBotTyping ? "visible" : "hidden" }}
              className={classes.typing}
              src={typingIndicator}
              alt="Typing indicator"
            />
            <Avatar alt="bot" className={classes.bot}>
              <span>&#129302;</span>
            </Avatar>
          </div>
          <div>
            <img
              style={{
                visibility:
                  !isBotTyping && !isDiscussionOver ? "visible" : "hidden",
              }}
              className={classes.typing}
              src={typingIndicator}
              alt="Typing indicator"
            />
            <Avatar alt="you" className={classes.orange}>
              Du
            </Avatar>
          </div>
        </section>
        {[
          <Question0
            className={classes.question}
            key="question0"
            response={response0}
            setResponse={setResponse0}
            setCurrentQuestion={setCurrentQuestion}
            isEditing={isEditing0}
            setIsEditing={setIsEditing0}
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
            response={response1}
            setResponse={setResponse1}
            setCurrentQuestion={setCurrentQuestion}
            isEditing={isEditing1}
            setIsEditing={setIsEditing1}
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
            response={response2}
            setResponse={setResponse2}
            setCurrentQuestion={setCurrentQuestion}
            isEditing={isEditing2}
            setIsEditing={setIsEditing2}
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
        ].slice(0, currentQuestion + 1)}
      </div>
    </div>
  );
};

export default App;
