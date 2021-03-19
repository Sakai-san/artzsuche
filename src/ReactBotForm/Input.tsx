import React, { FunctionComponent, ReactNode } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Response from "./Response";
import { DoValidation, RenderProps } from "./types";

type InputBaseProps = {
  errorMessage?: string;
  doValidation?: DoValidation;
  label?: ReactNode;
  type: "autocomplete" | "text" | "number" | "textarea";
  options?: any[];
  getOptionLabel?: (option: any) => string;
};

type AutocompleteInput = InputBaseProps & {
  options: any[];
  getOptionLabel: (option: any) => string;
  type: "autocomplete";
};

type TextInput = InputBaseProps & {
  type: "text";
};

type TextareaInput = InputBaseProps & {
  type: "textarea";
};

type NumberInput = InputBaseProps & {
  type: "number";
};

type InputProps = AutocompleteInput | TextInput | TextareaInput | NumberInput;

// TYPE GUARDS
export const isAutocompleteInput = (
  input: InputProps
): input is AutocompleteInput => input.type === "autocomplete";

export const isTextInput = (input: InputProps): input is TextInput =>
  input.type === "text";

export const isTextareaInput = (input: InputProps): input is TextareaInput =>
  input.type === "textarea";

export const isNumberInput = (input: InputProps): input is NumberInput =>
  input.type === "number";

const getComponent = (input: InputProps & RenderProps) => {
  const {
    label,
    doValidation,
    setResponse,
    inputedValue,
    index,
    setResponseInEdition,
    setIsValid,
    errorMessage,
    type,
    ...props
  } = input;

  //  if (type === "autocomplete") {
  if (isAutocompleteInput(input)) {
    return (
      <Autocomplete
        {...(props as Omit<AutocompleteInput, "type">)}
        style={{ width: 300 }}
        onFocus={() => {
          !doValidation && setIsValid(true);
          setResponseInEdition(index);
        }}
        onBlur={() => setResponseInEdition(null)}
        onChange={(e, value) =>
          setResponse(
            (props as Omit<AutocompleteInput, "type">).getOptionLabel(value) ||
              value,
            doValidation?.(value)
          )
        }
        renderInput={(params) => (
          <TextField {...params} label={label} variant="outlined" />
        )}
      />
    );
    // } else if (type === "text" || type === "number" || type === "textarea") {
  } else if (
    isTextInput(input) ||
    isNumberInput(input) ||
    isTextareaInput(input)
  ) {
    return (
      <TextField
        {...{ ...props, value: inputedValue }}
        helperText={
          (inputedValue !== undefined &&
            !doValidation?.(inputedValue) &&
            errorMessage) ||
          " "
        }
        onFocus={() => {
          !doValidation && setIsValid(true);
          setResponseInEdition(index);
        }}
        onBlur={() => setResponseInEdition(null)}
        onChange={(e) => {
          const value = e.target.value;
          setResponse(value, doValidation?.(value));
        }}
        error={doValidation && !doValidation?.(inputedValue)}
        label={label}
        type={type}
        variant="outlined"
        multiline={type === "textarea"}
      />
    );
  } else {
    return <></>;
  }
};

const Input: FunctionComponent<InputProps> = ({
  type,
  options,
  getOptionLabel,
  doValidation,
  label,
  errorMessage,
}) => (
  <Response doValidation={doValidation}>
    {({
      doValidation,
      inputedValue,
      setResponse,
      index,
      setResponseInEdition,
      setIsValid,
      ref,
    }) =>
      getComponent({
        type,
        label,
        doValidation,
        setResponse,
        inputedValue,
        index,
        setResponseInEdition,
        setIsValid,
        errorMessage,
        ref,
        options: options || [],
        getOptionLabel: getOptionLabel || ((a: any) => `${a}`),
      })
    }
  </Response>
);

export default Input;
