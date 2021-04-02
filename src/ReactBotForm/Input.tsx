import React, {
  FunctionComponent,
  ReactNode,
  ChangeEvent,
  FocusEvent,
  useContext,
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
import MaterialUIInput from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
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
    setCurrentWriter,
    ...props
  } = input;

  if (type === "autocomplete") {
    return (
      <Autocomplete
        {...(props as Omit<AutocompleteInput, "type">)}
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
  } else if (type === "radio") {
    return (
      <>
        {label && <FormLabel component="legend">{label}</FormLabel>}
        <ClickAwayListener
          onClickAway={(event) => {
            setCurrentWriter(null);
            setResponseInEdition(null);
          }}
        >
          <RadioGroup
            {...{ ref: props.ref, value: inputedValue || "" }}
            row
            aria-label="quiz"
            name={`${index}`}
            onFocus={(event: FocusEvent<HTMLInputElement>) => {
              if (!doValidation) {
                setIsValid(true);
              } else {
                setIsValid(doValidation(event.target.value));
              }

              setResponseInEdition(index);
              setCurrentWriter(USER_WRITER);
            }}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              const value = (event.target as HTMLInputElement).value;
              setResponse(value, doValidation?.(value));
            }}
          >
            {(props as Omit<RadioInput, "type">).options.map((option) => (
              <FormControlLabel
                control={<Radio />}
                key={option}
                value={option}
                label={option}
                labelPlacement="top"
              />
            ))}
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

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    };

    return (
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-chip-label">Chip</InputLabel>
        <Select
          {...{ ref: props.ref, value: inputedValue || [] }}
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          onFocus={(event: FocusEvent<{ value: unknown }>) => {
            if (!doValidation) {
              setIsValid(true);
            } else {
              setIsValid(doValidation(event.target.value as string));
            }

            setResponseInEdition(index);
            setCurrentWriter(USER_WRITER);
          }}
          onBlur={(event) => {
            setCurrentWriter(null);
            setResponseInEdition(null);
          }}
          onChange={(event: ChangeEvent<{ value: unknown }>) => {
            const selected = event.target.value as string[];
            setResponse(selected, doValidation?.(selected));
          }}
          input={<MaterialUIInput id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {(selected as string[]).map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {(props as Omit<MultiselectInput, "type">).options.map((name) => (
            <MenuItem
              key={name}
              value={name}
              // style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
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
