import { MutableRefObject } from "react";
import { PaletteOptions } from "@material-ui/core/styles/createPalette";

export type Answer = string | undefined | null;

export interface AnswerObject {
  content: Answer;
  isEditing: boolean;
  isValid: boolean;
}

export interface ResponseProps {
  className?: string;
  children: (args: {
    doValidation: (...args: any) => boolean;
    answer: AnswerObject["content"];
    setAnswer: (answer: Answer, isValid?: boolean, isEditing?: boolean) => void;
    domRef: any | MutableRefObject<HTMLElement | null>;
    onBlur: () => void;
  }) => JSX.Element;
  doValidation?: (...args: any) => boolean;
}

export type AnswerProps = {
  doValidation: (...args: any) => boolean;
};

export interface ReactBotFormOptions {
  theme?: PaletteOptions;
}

export interface ReactBotFormProps {
  options?: ReactBotFormOptions;
  children: Array<JSX.Element>;
}

/*
 TODO's:
  - click oustide the input, set isEditing to false
  - click on edit, then set answer to undefined, because currently keep the previous value
  - set the color of invalid input to red
  - check if resetEditing is up-to-date when next() is not called (last field)
  - Theming to be passed as option to the library
*/
