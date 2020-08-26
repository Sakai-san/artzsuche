// @ts-nocheck
import React, { useState } from "react";
import Step0 from "./Steps/Step0";
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import { WithStyles, withStyles, createStyles, Theme } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange } from "@material-ui/core/colors";

const styles = createStyles((theme: Theme) => ({
  root: {
    padding: "20px",
    "&>section:not(:first-child)": {
      marginTop: "30px",
      backgroundColor: "violet",
    },
  },
  lanes: {
    display: "flex",
    "&>div": {
      width: "50%",
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  bot: {
    fontSize: "35px",
  },
}));

interface IAppProps extends WithStyles<typeof styles> {
  classes: {
    root: string;
    lanes: string;
    orange: string;
  };
}

const App = withStyles(styles)(({ classes }: IAppProps) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [step0Response, setStep0Response] = useState<string | null>(null);
  const [step1Response, setStep1Response] = useState<string | null>(null);
  const [step2Response, setStep2Response] = useState<string | null>(null);

  return (
    <div className={classes.root}>
      <section className={classes.lanes}>
        <div>
          <Avatar alt="bot" className={classes.bot}>
            🤖
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
          key="step0"
          response={step0Response}
          setResponse={setStep0Response}
          setCurrentStep={setCurrentStep}
        />,
        <Step1
          key="step1"
          response={step1Response}
          setResponse={setStep1Response}
          setCurrentStep={setCurrentStep}
        />,
        <Step2
          key="step2"
          response={step2Response}
          setResponse={setStep2Response}
          setCurrentStep={setCurrentStep}
        />,
      ].slice(0, currentStep + 1)}
    </div>
  );
});

export default App;
