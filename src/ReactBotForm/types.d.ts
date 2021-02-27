import { ReactNode, ReactElement, MutableRefObject } from "react";
import { PaletteOptions } from "@material-ui/core/styles/createPalette";

export type Answer = string | undefined | null;

export interface AnswerObject {
  content: Answer;
  isEditing: boolean;
  isValid: boolean;
}

export interface RenderProps {
  answer: AnswerObject["content"];
  setAnswer: (answer: Answer, isValid?: boolean, isEditing?: boolean) => void;
  isBotTyping: boolean;
  setIsBotTyping: (arg: boolean) => void;
  isEditing: AnswerObject["isEditing"];
}

export interface ISuggestionProps
  extends Partial<Omit<RenderProps, "setAnswer">>,
    Pick<RenderProps, "setAnswer"> {
  className?: string;
  children?: (args: any) => any;
  onBlur?: any;
  doValidation?: (...args: any) => boolean;
  domRef?: MutableRefObject<HTMLElement | null>;
}

export type IAnswerProps = Pick<RenderProps, "setAnswer" | "answer"> & {
  doValidation: (...args: any) => boolean;
};

export interface ReactBotFormOptions {
  theme?: PaletteOptions;
}

export interface ReactBotFormProps {
  options?: ReactBotFormOptions;
  children: Array<(args: RenderProps) => JSX.Element>;
}

/*
 TODO's:
  - click on edit, then set answer to undefined, because currently keep the previous value
  - set the color of invalid input to red
  - check if resetEditing is up-to-date when next() is not called (last field)
  - Theming to be passed as option to the library
  - Click outside of input -> not edit mode

*/
