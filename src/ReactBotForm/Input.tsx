import React, {
  FunctionComponent,
  ReactNode,
  ChangeEvent,
  FocusEvent,
} from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Chip from "@material-ui/core/Chip";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Response from "./Response";
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
  type: "autocomplete";
};

type SimpleInput = InputBaseProps & {
  type: "number" | "textarea" | "text";
};

type RadioInput = InputBaseProps & {
  options: any[];
  type: "radio";
};

type MultiselectInput = InputBaseProps & {
  options: any[];
  type: "multiselect";
};

type InputProps =
  | AutocompleteInput
  | SimpleInput
  | RadioInput
  | MultiselectInput;

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
        {...{
          options: props.options,
          value: inputedValue,
          ref: props.ref,
        }}
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
  } else if (type === "multiselect") {
    const handleChangeMultiple = (event: ChangeEvent<{ value: unknown }>) => {
      const { options } = event.target as HTMLSelectElement;
      const value: string[] = [];
      for (let i = 0, l = options.length; i < l; i += 1) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }
      setResponse(value, doValidation?.(value));
    };

    return (
      <FormControl className={classes.formControl}>
        <InputLabel shrink htmlFor="select-multiple-native">
          {label}
        </InputLabel>
        <ClickAwayListener onClickAway={() => setResponseInEdition(null)}>
          <Select
            {...{ ref: props.ref, value: inputedValue }}
            multiple
            native
            onFocus={(event: FocusEvent<{ value: unknown }>) => {
              !doValidation && setIsValid(true);
              setResponseInEdition(index);
            }}
            onChange={handleChangeMultiple}
            inputProps={{
              id: "select-multiple-native",
            }}
          >
            {(props as Omit<MultiselectInput, "type">).options.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </Select>
        </ClickAwayListener>
      </FormControl>
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
  const classes = useStyles();

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
          options: options || [],
          getOptionLabel: getOptionLabel || ((a: any) => `${a}`),
        })
      }
    </Response>
  );
};

export default Input;
