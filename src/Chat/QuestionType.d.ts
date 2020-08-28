export interface IQuestionProps {
  response: string | null;
  setResponse: (response: string | null) => void;
  setCurrentQuestion: (step: number) => void;
  className?: string;
  options?: any;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
}

export type IResponseProps = Pick<
  IQuestionProps,
  "response" | "setResponse" | "setIsEditing"
> & { setIsInputValid?: (args: any) => void };
