export interface IQuestionProps {
  response: string | null;
  setResponse: (response: string | null) => void;
  setCurrentQuestion: (step: number) => void;
  className?: string;
  options?: any;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  setIsBotTyping: (arg: boolean) => void;
  isBotTyping: boolean;
  children: (props: (arg: boolean) => void) => JSX.Element;
}

export type IResponseProps = Pick<
  IQuestionProps,
  "response" | "setResponse" | "setIsEditing"
> & { setIsInputValid?: (args: any) => void };
