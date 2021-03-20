import React, { FunctionComponent, ReactNode } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Radio, { RadioProps } from "@material-ui/core/Radio";
import Response from "./Response";
import { DoValidation, RenderProps } from "./types";

type InputBaseProps = {
  errorMessage?: string;
  doValidation?: DoValidation;
  label?: ReactNode;
  type: "autocomplete" | "text" | "number" | "textarea" | "radio";
  options?: any[];
  getOptionLabel?: (option: any) => string;
};

type AutocompleteInput = InputBaseProps & {
  options: any[];
  getOptionLabel: (option: any) => string;
  type: "autocomplete";
};

type SimpleInput = InputBaseProps & {
  type: "number" | "textarea" | "text";
};

type RadioInput = InputBaseProps & {
  options: any[];
  getOptionLabel?: (option: any) => string;
  type: "radio";
};

type InputProps = AutocompleteInput | SimpleInput | RadioInput;

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

  if (type === "autocomplete") {
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
  } else if (type === "text" || type === "number" || type === "textarea") {
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
  } else if (type === "radio") {
    return (
      <div>
        {props?.options?.map?.((option) => {
          return (
            <Radio
              checked={inputedValue === option}
              onChange={(e) => {
                const value = e.target.value;
                setResponse(
                  (props as Omit<RadioInput, "type">)?.getOptionLabel?.(
                    value
                  ) || value
                );
              }}
              value={option}
              name={`reactBotForm-radio-${index}`}
              inputProps={{ "aria-label": option }}
            />
          );
        })}
      </div>
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
