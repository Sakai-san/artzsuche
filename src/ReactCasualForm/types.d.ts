import { ReactNode } from "react";

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
  options?: any;
  children?: (args: any) => ReactNode;
  onBlur?: any;
  doValidation?: (...args: any) => boolean;
}

export type IAnswerProps = Pick<IBase, "setAnswer"> & {
  answer: string;
  doValidation: (...args: any) => boolean;
};

export interface IReactCasualFormProps {
  children: Array<(args: IBase) => ReactNode>;
}
