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
  getOptionLabel: (option: any) => string;
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

const getOptionsFromAttribute = (
  options: Array<any>,
  getOptionLabel: (option: any) => string,
  values: Array<string>
) => {
  let opts: Array<any> = [];

  values.forEach((val) => {
    opts = opts.concat(options.filter((op) => getOptionLabel(op) === val));
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
    ...props
  } = input;

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
          if (!doValidation) {
            setIsValid(true);
          } else {
            setIsValid(doValidation(event.target.value));
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
              )
            );
          } else {
            setResponse(
              (props as Omit<AutocompleteInput, "type">).getOptionLabel(
                value
              ) || value,
              doValidation?.(value)
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
            !doValidation?.(inputedValue) &&
            errorMessage) ||
          " "
        }
        onFocus={(event) => {
          if (!doValidation) {
            setIsValid(true);
          } else {
            setIsValid(doValidation(event.target.value));
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
}) => {
  const { setResponseInEdition, setCurrentWriter } = useContext(
    ReactBotFormContext
  );

  const classes = useStyles();

  return (
    <Response doValidation={doValidation}>
      {({ doValidation, inputedValue, setResponse, index, setIsValid, ref }) =>
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
