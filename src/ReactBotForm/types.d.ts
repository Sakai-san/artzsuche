import { Dispatch, SetStateAction } from "react";
import { PaletteOptions } from "@material-ui/core/styles/createPalette";

type DoValidation = (...args: any) => boolean;

export type Input = string | undefined | null;

export interface Response {
  input: Input;
  isValid: boolean;
}

export type Responses = Record<string, Response>;

export interface ResponseProps {
  className?: string;
  doValidation?: (...args: any) => boolean;
  children: (args: {
    index: number | null;
    doValidation?: (...args: any) => boolean;
    input: Response["input"];
    setResponse: (input: Input, isValid: boolean) => void;
    responseInEdition: null | number;
    setResponseInEdition: Dispatch<SetStateAction<null | number>>;
    setIsValid: (isValid: boolean) => void;
    domRef: MutableRefObject<HTMLElement | null>;
  }) => JSX.Element;
}

export type ReadProps = {
  doValidation?: DoValidation;
};

export interface WriteProps {
  children: (...args: any) => JSX.Element;
  doValidation?: DoValidation;
}

export interface ReactBotFormOptions {
  theme?: PaletteOptions;
}

export interface ReactBotFormProps {
  submitHandler: (responses: Record<string, Input>) => void;
  children: Array<JSX.Element>;
}

export interface FormContext {
  responseInEdition: null | number;
  setResponseInEdition: Dispatch<SetStateAction<null | number>>;
  isBotTyping: boolean;
  setIsBotTyping: Dispatch<SetStateAction<boolean>>;
}

export interface FormChildContext {
  index: number;
  input: Response["input"];
  isValid: Response["isValid"] | undefined;
  setResponse: (input: Input, isValid: boolean) => void;
  setIsValid: (isValid: boolean) => void;
}

/*
 TODO's:
  - Theming to be passed as option to the library
*/
