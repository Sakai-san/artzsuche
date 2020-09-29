import { ReactNode } from "react";

export type Answer = string | null;

export interface AnswerObject {
  content: Answer;
  isEditing: boolean;
}

export interface IBase {
  setHasError: (args: boolean) => void;
  setIsBotTyping: (arg: boolean) => void;
  answer: AnswerObject["content"];
  isEditing: AnswerObject["isEditing"];
  isBotTyping: boolean;
  setAnswer: (answer: Answer, isEditing?: boolean) => void;
}

export interface ISuggestionProps
  extends Partial<Omit<IBase, "setAnswer">>,
    Pick<IBase, "setAnswer"> {
  className?: string;
  options?: any;
  children?: (args: any) => ReactNode;
  isValid?: (input: string | undefined) => boolean;
  onBlur?: any;
}

export type IAnswerProps = Pick<IBase, "setAnswer"> & {
  answer: string;
  setIsInputValid?: (args: any) => void;
};

export interface IReactCasualFormProps {
  children: Array<(args: IBase) => ReactNode>;
}
