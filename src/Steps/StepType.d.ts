export interface IStepProps {
  response: string | null;
  setResponse: (response: string | null) => void;
  setCurrentStep: (step: number) => void;
  className?: string;
  options?: any;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
}

export type IResponseProps = Pick<
  IStepProps,
  "response" | "setResponse" | "setIsEditing"
>;
