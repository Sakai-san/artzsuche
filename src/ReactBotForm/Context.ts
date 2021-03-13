import { createContext } from "react";
import { FormContext, FormChildContext, Input } from "./types";

export const ReactBotFormContext = createContext<FormContext>({
  responseInEdition: null,
  setResponseInEdition: () => {},
  isBotTyping: false,
  setIsBotTyping: () => {},
});

export const ReactBotFormChildContext = createContext<FormChildContext>({
  index: 0,
  input: undefined,
  isValid: undefined,
  setResponse: (input: Input, isValid?: boolean) => {},
  setIsValid: (isValid: boolean) => {},
});
