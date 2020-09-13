import { ReactNode } from "react";

export type Response = string | null;

export interface IQuestionProps {
  className?: string;
  options?: any;
  setIsBotTyping?: (arg: boolean) => void;
  children: (args: any) => ReactNode;
  response?: Response;
  setResponse?: (response: Response) => void;
  isBotTyping?: boolean;
}

export interface ISuggestionProps extends IQuestionProps {
  isValid?: (input: string | undefined) => boolean;
}

export type IResponseProps = Pick<
  IQuestionProps,
  "response" | "setResponse"
> & { setIsInputValid?: (args: any) => void };

export interface IReactCasualFormProps {
  children: Array<(args: any) => ReactNode>;
}
