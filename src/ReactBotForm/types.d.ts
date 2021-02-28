import { ReactNode, ReactElement } from "react";
import { PaletteOptions } from "@material-ui/core/styles/createPalette";

export type Answer = string | undefined | null;

export interface AnswerObject {
  content: Answer;
  isEditing: boolean;
  isValid: boolean;
}

export interface ReactBotFormElement {
  answer: AnswerObject["content"];
  setAnswer: (answer: Answer, isValid?: boolean, isEditing?: boolean) => void;
  isBotTyping: boolean;
  setIsBotTyping: (arg: boolean) => void;
  isEditing: AnswerObject["isEditing"];
}

export interface ResponseProps extends ReactBotFormElement {
  className?: string;
  children?: (args: any) => any;
  doValidation?: (...args: any) => boolean;
}

export type QuestionProps = Pick<ReactBotFormElement, "setIsBotTyping">;

export type IAnswerProps = Pick<ReactBotFormElement, "setAnswer" | "answer"> & {
  doValidation: (...args: any) => boolean;
};

export interface ReactBotFormOptions {
  theme?: PaletteOptions;
}

export interface ReactBotFormProps {
  options?: ReactBotFormOptions;
  children: Array<(args: ReactBotFormElement) => JSX.Element>;
}

/*
 TODO's:
  - click on edit, then set answer to undefined, because currently keep the previous value
  - set the color of invalid input to red
  - check if resetEditing is up-to-date when next() is not called (last field)
  - Theming to be passed as option to the library
  - Click outside of input -> not edit mode

*/
