import React, { useState } from "react";
import Step0 from "./Steps/Step0";
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import { WithStyles, withStyles, createStyles } from "@material-ui/core";

const styles = createStyles({
  root: {
    padding: "20px",
    "&>section:not(:first-child)": {
      marginTop: "30px",
    },
  },
});

interface IAppProps extends WithStyles<typeof styles> {
  classes: {
    root: string;
  };
}

const App = withStyles(styles)(({ classes }: IAppProps) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [step0Response, setStep0Response] = useState<string | null>(null);
  const [step1Response, setStep1Response] = useState<string | null>(null);
  const [step2Response, setStep2Response] = useState<string | null>(null);

  console.log("step0Response", step0Response);

  return (
    <div className={classes.root}>
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
