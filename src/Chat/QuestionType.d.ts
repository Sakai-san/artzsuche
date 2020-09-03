export interface IQuestionProps {
  response: string | null;
  setResponse: (response: string | null) => void;
  className?: string;
  options?: any;
  setIsBotTyping: (arg: boolean) => void;
  isBotTyping: boolean;
  children: (props: (arg: boolean) => void) => JSX.Element;
}

export type IResponseProps = Pick<
  IQuestionProps,
  "response" | "setResponse"
> & { setIsInputValid?: (args: any) => void };
