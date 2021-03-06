import { Dispatch, SetStateAction, MutableRefObject } from "react";
import { PaletteOptions } from "@material-ui/core/styles/createPalette";

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
    domRef: MutableRefObject<HTMLElement | null>;
    setIsValid: (isValid: boolean) => void;
  }) => JSX.Element;
}

export type ReadProps = {
  doValidation?: (...args: any) => boolean;
};

export interface WriteProps {
  children: (...args: any) => JSX.Element;
}

export interface ReactBotFormOptions {
  theme?: PaletteOptions;
}

export interface ReactBotFormProps {
  submitHandler: (responses: Record<string, Input>) => void;
  children: Array<JSX.Element>;
}

/*
 TODO's:
  - Theming to be passed as option to the library
*/
