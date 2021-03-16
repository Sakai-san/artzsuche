import { Dispatch, SetStateAction } from "react";

export interface Response {
  inputedValue: string;
  isValid: boolean;
}

export type Responses = Record<string, Response>;

type DoValidation = (inputedValue: string) => boolean;
type SetResponse = (inputedValue: string, isValid?: boolean) => void;
type SetIsValid = (isValid: boolean) => void;

export type RenderProps = {
  index: number;
  doValidation?: DoValidation;
  inputedValue: Response["inputedValue"];
  setResponse: SetResponse;
  responseInEdition: null | number;
  setResponseInEdition: Dispatch<SetStateAction<null | number>>;
  setIsValid: SetIsValid;
  ref: MutableRefObject<HTMLElement | null>;
};

export interface ResponseProps {
  doValidation?: DoValidation;
  children: (args: RenderProps) => JSX.Element;
}

export type ReadProps = {
  doValidation?: DoValidation;
};

export interface WriteProps {
  children: (...args: any) => JSX.Element;
  doValidation?: DoValidation;
}

export interface ReactBotFormProps {
  submitHandler: (responses: Record<string, Reponse["inputedValue"]>) => void;
  children: Array<JSX.Element>;
}

export interface FormContext {
  responseInEdition: null | number;
  setResponseInEdition: Dispatch<SetStateAction<null | number>>;
  isBotTyping: boolean;
  setIsBotTyping: Dispatch<SetStateAction<boolean>>;
}

export interface FormChildContext {
  index: number;
  inputedValue: Response["inputedValue"];
  isValid: Response["isValid"] | undefined;
  setResponse: SetResponse;
  setIsValid: SetIsValid;
}
