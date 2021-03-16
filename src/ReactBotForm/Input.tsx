// @ts-nocheck
import React, { FunctionComponent, ReactNode } from "react";
import { UseAutocompleteProps } from "@material-ui/lab/useAutocomplete";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Response from "./Response";
import { DoValidation, RenderProps } from "./types";

type InputProps = {
  errorMessage?: string;
  type: string;
  doValidation?: DoValidation;
  label?: ReactNode;
  /*
  options?: any[];
  getOptionLabel?: (option: any) => string;
  label?: string;
  */
} & Partial<UseAutocompleteProps<any, boolean, boolean, boolean>>;

const getComponent = (type: string, config: RenderProps & InputProps) => {
  const {
    label,
    doValidation,
    setResponse,
    inputedValue,
    index,
    setResponseInEdition,
    setIsValid,
    errorMessage,
    ...props
  } = config;

  switch (type) {
    case "autocomplete": {
      return (
        <Autocomplete
          {...props}
          style={{ width: 300 }}
          onFocus={() => {
            !doValidation && setIsValid(true);
            setResponseInEdition(index);
          }}
          onBlur={() => setResponseInEdition(null)}
          onChange={(e, value) =>
            setResponse(
              props.getOptionLabel?.(value) || value,
              doValidation?.(value)
            )
          }
          renderInput={(params) => (
            <TextField {...params} label={label} variant="outlined" />
          )}
        />
      );
    }
    case "text":
    case "textarea":
    case "number": {
      const { getOptionLabel, options, ...localProps } = props;
      return (
        <TextField
          {...{ ...localProps, value: inputedValue }}
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
    }
  }
};

const Input: FunctionComponent<InputProps> = ({
  type,
  options,
  getOptionLabel,
  doValidation,
  label,
  errorMessage,
}) => {
  return (
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
        getComponent(type, {
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
          getOptionLabel,
        })
      }
    </Response>
  );
};

export default Input;
