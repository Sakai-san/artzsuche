import { ReactNode } from "react";

export type Answer = string | null;

export interface IBase {
  setIsBotTyping: (arg: boolean) => void;
  answer: Answer;
  isBotTyping: boolean;
  setAnswer: (answer: Answer) => void;
}

export interface ISuggestionProps
  extends Partial<Omit<IBase, "setAnswer">>,
    Pick<IBase, "setAnswer"> {
  className?: string;
  options?: any;
  children?: (args: any) => ReactNode;
  isValid?: (input: string | undefined) => boolean;
}

export type IAnswerProps = Pick<IBase, "answer" | "setAnswer"> & {
  setIsInputValid?: (args: any) => void;
};

export interface IReactCasualFormProps {
  children: Array<(args: IBase) => ReactNode>;
}
