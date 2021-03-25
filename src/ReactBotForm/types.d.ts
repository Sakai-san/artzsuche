import { Dispatch, SetStateAction, MutableRefObject } from "react";
import { BOT_WRITER, USER_WRITER } from "./constants";

export type Writer = typeof BOT_WRITER | typeof USER_WRITER | null;

export interface Response {
  inputedValue: string | string[];
  isValid: boolean;
}

export type Responses = Record<string, Response>;

type DoValidation = (inputedValue: Response["inputedValue"]) => boolean;
type SetResponse = (
  inputedValue: Response["inputedValue"],
  isValid?: boolean
) => void;
type SetIsValid = (isValid: boolean) => void;

export type RenderProps = {
  index: number;
  doValidation?: DoValidation;
  inputedValue: Response["inputedValue"];
  setResponse: SetResponse;
  setResponseInEdition: Dispatch<SetStateAction<null | number>>;
  setIsValid: SetIsValid;
  ref: MutableRefObject<HTMDivLElement | null>;
  setCurrentWriter: Dispatch<SetStateAction<Writer>>;
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
  submitHandler: (responses: Record<string, Response["inputedValue"]>) => void;
  children: Array<JSX.Element>;
}

export interface FormContext {
  responseInEdition: null | number;
  setResponseInEdition: Dispatch<SetStateAction<null | number>>;
  currentWriter: Writer;
  setCurrentWriter: Dispatch<SetStateAction<Writer>>;
}

export interface FormChildContext {
  index: number;
  inputedValue: Response["inputedValue"];
  isValid: Response["isValid"] | undefined;
  setResponse: SetResponse;
  setIsValid: SetIsValid;
}
