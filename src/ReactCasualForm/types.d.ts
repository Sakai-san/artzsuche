import { ReactNode } from "react";

export type Response = string | null;

export interface IBase {
  setIsBotTyping: (arg: boolean) => void;
  response: Response;
  isBotTyping: boolean;
  setResponse: (response: Response) => void;
}

export interface ISuggestionProps
  extends Partial<Omit<IBase, "setResponse">>,
    Pick<IBase, "setResponse"> {
  className?: string;
  options?: any;
  children?: (args: any) => ReactNode;
  isValid?: (input: string | undefined) => boolean;
}

export type IResponseProps = Pick<IBase, "response" | "setResponse"> & {
  setIsInputValid?: (args: any) => void;
};

export interface IReactCasualFormProps {
  children: Array<(args: Base) => ReactNode>;
}
