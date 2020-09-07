import { ReactElement } from "react";

export type Response = string | null;

export interface IQuestionProps {
  className?: string;
  options?: any;
  setIsBotTyping?: (arg: boolean) => void;
  children?: (args: any) => ReactElement;
  response?: Response;
  setResponse?: (response: Response) => void;
  isBotTyping?: boolean;
}

export type IResponseProps = Pick<
  QuestionExtendedProps,
  "response" | "setResponse"
> & { setIsInputValid?: (args: any) => void };
