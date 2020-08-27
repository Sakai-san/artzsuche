import React, { FunctionComponent, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Step0 from "./Steps/Step0";
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import { useDispatch } from "react-redux";
import { Theme, makeStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ForumIcon from "@material-ui/icons/Forum";
import { deepOrange } from "@material-ui/core/colors";
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
  step: {
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
}));

const App: FunctionComponent = () => {
  const classes = useStyles();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [step0Response, setStep0Response] = useState<string | null>(null);
  const [step1Response, setStep1Response] = useState<string | null>(null);
  const [step2Response, setStep2Response] = useState<string | null>(null);

  const [step0IsEditing, setStep0IsEditing] = useState<boolean>(false);
  const [step1IsEditing, setStep1IsEditing] = useState<boolean>(false);
  const [step2IsEditing, setStep2IsEditing] = useState<boolean>(false);

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
          <ForumIcon />
        </Toolbar>
      </AppBar>

      <div className={classes.content}>
        <section className={classes.lanes}>
          <div>
            <Avatar alt="bot" className={classes.bot}>
              <span>&#129302;</span>
            </Avatar>
          </div>
          <div>
            <Avatar alt="you" className={classes.orange}>
              Du
            </Avatar>
          </div>
        </section>
        {[
          <Step0
            className={classes.step}
            key="step0"
            response={step0Response}
            setResponse={setStep0Response}
            setCurrentStep={setCurrentStep}
            options={cantons}
            isEditing={step0IsEditing}
            setIsEditing={setStep0IsEditing}
          />,
          <Step1
            className={classes.step}
            key="step1"
            response={step1Response}
            setResponse={setStep1Response}
            setCurrentStep={setCurrentStep}
            isEditing={step1IsEditing}
            setIsEditing={setStep1IsEditing}
          />,
          <Step2
            className={classes.step}
            key="step2"
            response={step2Response}
            setResponse={setStep2Response}
            setCurrentStep={setCurrentStep}
            options={physicians}
            isEditing={step2IsEditing}
            setIsEditing={setStep2IsEditing}
          />,
        ].slice(0, currentStep + 1)}
      </div>
    </div>
  );
};

export default App;
