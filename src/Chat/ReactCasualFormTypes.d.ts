import { ReactElement } from "react";

export type Response = string | null;

export interface IQuestionProps {
  response: Response;
  setResponse: (response: Response) => void;
  className?: string;
  options?: any;
  setIsBotTyping: (arg: boolean) => void;
  isBotTyping: boolean;
  children: (args: any) => ReactElement;
}

export type IResponseProps = Pick<
  IQuestionProps,
  "response" | "setResponse"
> & { setIsInputValid?: (args: any) => void };
