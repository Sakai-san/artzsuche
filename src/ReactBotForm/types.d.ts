import { MutableRefObject } from "react";
import { PaletteOptions } from "@material-ui/core/styles/createPalette";

export type Input = string | undefined | null;

export interface Response {
  input: Input;
  isEditing: boolean;
  isValid: boolean;
}

export interface ResponseProps {
  className?: string;
  children: (args: {
    doValidation: (...args: any) => boolean;
    input: Response["input"];
    setInput: (input: Input, isValid?: boolean, isEditing?: boolean) => void;
    domRef: any | MutableRefObject<HTMLElement | null>;
    onBlur: () => void;
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
  - test resetEditing in clickouside
  - test moving around last field and see the value of isEditing
  - test if clickoutide is called when clicking on the next button
*/
