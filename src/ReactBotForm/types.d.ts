import { Dispatch, SetStateAction, MutableRefObject } from "react";
import { PaletteOptions } from "@material-ui/core/styles/createPalette";

export type Input = string | undefined | null;

export interface Response {
  input: Input;
  isValid: boolean;
}

export type Responses = Record<number, Response>;

export interface ResponseProps {
  className?: string;
  children: (args: {
    index: number | null;
    doValidation: (...args: any) => boolean;
    input: Response["input"];
    setResponse: (input: Input, isValid: boolean) => void;
    responseInEdition: null | number;
    setResponseInEdition: Dispatch<SetStateAction<null | number>>;
    domRef: any | MutableRefObject<HTMLElement | null>;
  }) => JSX.Element;
  doValidation?: (...args: any) => boolean;
}

export type ReadProps = {
  doValidation: (...args: any) => boolean;
};

export interface WriteProps {
  isHidden: boolean;
  children: (...args: any) => JSX.Element;
}

export interface ReactBotFormOptions {
  theme?: PaletteOptions;
}

export interface ReactBotFormProps {
  options?: ReactBotFormOptions;
  children: Array<JSX.Element>;
}

/*
 TODO's:
  - Theming to be passed as option to the library
*/
