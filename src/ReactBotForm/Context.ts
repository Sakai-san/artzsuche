import { createContext } from "react";
import { FormContext, FormChildContext, Response } from "./types";

export const ReactBotFormContext = createContext<FormContext>({
  responseInEdition: null,
  setResponseInEdition: () => {},
  currentWriter: null,
  setCurrentWriter: () => {},
});

export const ReactBotFormChildContext = createContext<FormChildContext>({
  index: 0,
  inputedValue: "",
  isValid: undefined,
  setResponse: (
    inputedValue: Response["inputedValue"],
    isValid?: boolean
  ) => {},
  setIsValid: (isValid: boolean) => {},
});
