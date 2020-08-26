// @ts-nocheck
import React, { useEffect, useState } from "react";
import Step0 from "./Step0";
import Step1 from "./Step1";
import logo from "./logo.svg";
import "./App.css";

const App = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [step0Response, setStep0Response] = useState<string | null>(null);
  const [step1Response, setStep1Response] = useState<string | null>(null);

  console.log("step0Response", step0Response);
  console.log("step1Response", step1Response);
  return (
    <div>
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
      ]}
    </div>
  );
};

export default App;
