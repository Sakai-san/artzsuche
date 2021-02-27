import { ReactNode, ReactElement, MutableRefObject } from "react";

export type Answer = string | null;

export interface AnswerObject {
  content: Answer;
  isEditing: boolean;
  isValid: boolean;
}

export interface IBase {
  setIsBotTyping: (arg: boolean) => void;
  answer: AnswerObject["content"];
  isEditing: AnswerObject["isEditing"];
  isBotTyping: boolean;
  setAnswer: (answer: Answer, isValid: boolean, isEditing?: boolean) => void;
}

export interface ISuggestionProps
  extends Partial<Omit<IBase, "setAnswer">>,
    Pick<IBase, "setAnswer"> {
  className?: string;
  children?: (args: any) => any;
  onBlur?: any;
  doValidation?: (...args: any) => boolean;
  domRef?: MutableRefObject<HTMLElement | null>;
}

export type IAnswerProps = Pick<IBase, "setAnswer" | "answer"> & {
  doValidation: (...args: any) => boolean;
};

export interface IReactCasualFormProps {
  children: Array<(args: IBase) => JSX.Element>;
}

/*

 TODO's:
  - click on edit, then set answer to undefined, because currently keep the previous value
  - set the color of invalid input to red
  - check if resetEditing is up-to-date when next() is not called (last field)
  - Theming to be passed as option to the library
  - Click outside of input -> not edit mode

*/
