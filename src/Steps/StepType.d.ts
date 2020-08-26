export interface IStepProps {
  response: string | null;
  setResponse: (response: string) => void;
  setCurrentStep: (step: number) => void;
  className?: string;
}
