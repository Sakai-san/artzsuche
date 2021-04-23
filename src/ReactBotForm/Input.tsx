// @ts-nocheck
import React, {
  FunctionComponent,
  ReactNode,
  FocusEvent,
  useContext,
} from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Response from "./Response";
import { ReactBotFormContext } from "./Context";
import { USER_WRITER } from "./constants";
import { DoValidation, RenderProps } from "./types";
import { ClassNameMap } from "@material-ui/styles";

type InputBaseProps = {
  required?: boolean;
  errorMessage?: string;
  doValidation?: DoValidation;
  label?: ReactNode;
  type:
    | "autocomplete"
    | "text"
    | "number"
    | "textarea"
    | "radio"
    | "multiselect";
  options?: any[];
  getOptionLabel?: (option: any) => string;
};

type AutocompleteInput = InputBaseProps & {
  options: any[];
  getOptionLabel: (option: any | undefined) => string;
  type: "autocomplete" | "multiselect";
};

type SimpleInput = InputBaseProps & {
  type: "number" | "textarea" | "text";
};

type InputProps = AutocompleteInput | SimpleInput;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: "flex",
      flexWrap: "wrap",
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  })
);

const makeValidate = ({
  type,
  required,
  options,
  getOptionLabel,
  doValidation,
}: any) => {
  if (type === "number" || type === "textarea" || type === "text") {
    if (required) {
      return (value: string) => !!value;
    } else if (doValidation) {
      return (value: string) => doValidation(value);
    } else {
      return (value: string) => true;
    }
  } else if (type === "autocomplete") {
    if (required) {
      return (value: string) =>
        options?.some((option) => getOptionLabel?.(option) === value);
    } else {
      return (value: string) => true;
    }
  }
  // "multiselect"
  else {
    if (required) {
      // at least one value is part of the labels
      const labels = options?.map((option) => getOptionLabel?.(option));
      return (inputedValues: string[]) =>
        inputedValues &&
        inputedValues?.some((value: any) => labels?.indexOf(value) !== -1);
    } else {
      return (inputedValues: string[]) => true;
    }
  }
};

const getOptionsFromAttribute = (
  options: AutocompleteInput["options"],
  getOptionLabel: AutocompleteInput["getOptionLabel"],
  values: Array<string>
) => {
  let opts: Array<any> = [];

  values.forEach((val) => {
    opts = opts.concat(
      options.filter((option) => getOptionLabel(option) === val)
    );
  });

  return opts;
};

const getComponent = (
  input: InputProps & RenderProps & { classes: ClassNameMap<any> }
) => {
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
    classes,
    setCurrentWriter,
    required,
    ...props
  } = input;

  const valid = makeValidate({
    type,
    required,
    doValidation,
    options: props.options,
    getOptionLabel: props.getOptionLabel,
  });

  if (type === "autocomplete" || type === "multiselect") {
    return (
      <Autocomplete
        {...(props as Omit<AutocompleteInput, "type">)}
        multiple={type === "multiselect"}
        value={
          type === "multiselect"
            ? getOptionsFromAttribute(
                props.options as Array<any>,
                props.getOptionLabel as (op: any) => string,
                (inputedValue as string[]) || []
              )
            : props.options?.find?.(
                (option) => props.getOptionLabel?.(option) === inputedValue
              )
        }
        style={{ width: 300 }}
        onFocus={(event: FocusEvent<HTMLInputElement>) => {
          // input not required or doValidation is not passed
          if (!required && !doValidation) {
            setIsValid(true);
          } else {
            setIsValid(valid(event.target.value));
          }

          setResponseInEdition(index);
          setCurrentWriter(USER_WRITER);
        }}
        onBlur={(event) => {
          setCurrentWriter(null);
          setResponseInEdition(null);
        }}
        onChange={(e, value) => {
          if (type === "multiselect") {
            setResponse(
              value.map((input: string) =>
                (props as Omit<AutocompleteInput, "type">).getOptionLabel(input)
              ),
              valid(value)
            );
          } else {
            setResponse(
              (value &&
                (props as Omit<AutocompleteInput, "type">).getOptionLabel(
                  value
                )) ||
                value,
              valid(value)
            );
          }
        }}
        renderInput={(params) => (
          <TextField {...params} label={label} variant="outlined" />
        )}
      />
    );
  } else if (type === "text" || type === "number" || type === "textarea") {
    return (
      <TextField
        {...{
          options: props.options,
          ref: props.ref,
        }}
        value={inputedValue}
        className={classes.textarea}
        helperText={
          (inputedValue !== undefined &&
            !valid(inputedValue) &&
            errorMessage) ||
          " "
        }
        onFocus={(event) => {
          // input not required or doValidation is not passed
          if (!required && !doValidation) {
            setIsValid(true);
          } else {
            setIsValid(valid(event.target.value));
          }

          setResponseInEdition(index);
          setCurrentWriter(USER_WRITER);
        }}
        onBlur={(event) => {
          setCurrentWriter(null);
          setResponseInEdition(null);
        }}
        onChange={(e) => {
          const value = e.target.value;
          setResponse(value, valid(value));
        }}
        error={valid(inputedValue)}
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
  required,
  type,
  options,
  getOptionLabel,
  doValidation,
  label,
  errorMessage,
}) => {
  const { setResponseInEdition, setCurrentWriter } = useContext(
    ReactBotFormContext
  );

  const classes = useStyles();

  return (
    <Response doValidation={doValidation}>
      {({ index, doValidation, inputedValue, setResponse, setIsValid, ref }) =>
        getComponent({
          required,
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
          classes,
          setCurrentWriter,
          options: options || [],
          getOptionLabel: getOptionLabel || ((a: any) => `${a}`),
        })
      }
    </Response>
  );
};

export default Input;
