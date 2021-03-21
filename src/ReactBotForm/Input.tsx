import React, {
  FunctionComponent,
  ReactNode,
  ChangeEvent,
  FocusEvent,
} from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Radio from "@material-ui/core/Radio";
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
        {...{ options: props.options, value: inputedValue, ref: props.ref }}
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
      <>
        {label && <FormLabel component="legend">{label}</FormLabel>}
        <ClickAwayListener onClickAway={() => setResponseInEdition(null)}>
          <RadioGroup
            {...{ ref: props.ref, value: inputedValue || "" }}
            row
            aria-label="quiz"
            name={`${index}`}
            onFocus={(event: FocusEvent<HTMLInputElement>) => {
              !doValidation && setIsValid(true);
              setResponseInEdition(index);
            }}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              const value = (event.target as HTMLInputElement).value;
              setResponse(value, doValidation?.(value));
            }}
          >
            {(props as Omit<RadioInput, "type">).options.map((option) => {
              return (
                <FormControlLabel
                  control={<Radio />}
                  key={option}
                  value={option}
                  label={option}
                  labelPlacement="top"
                />
              );
            })}
          </RadioGroup>
        </ClickAwayListener>
      </>
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
