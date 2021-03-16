import { Dispatch, SetStateAction } from "react";

export type Input = string | undefined | null;

export interface Response {
  input: Input;
  isValid: boolean;
}

export type Responses = Record<string, Response>;

type DoValidation = (input: string | undefined) => boolean;
type SetResponse = (input: Input, isValid?: boolean) => void;
type SetIsValid = (isValid: boolean) => void;

export type RenderProps = {
  index: number;
  doValidation?: DoValidation;
  input: Response["input"];
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
  submitHandler: (responses: Record<string, Input>) => void;
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
  input: Response["input"];
  isValid: Response["isValid"] | undefined;
  setResponse: SetResponse;
  setIsValid: SetIsValid;
}
