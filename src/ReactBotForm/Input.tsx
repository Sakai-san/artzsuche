import React, { FunctionComponent, ReactNode } from "react";
import { UseAutocompleteProps } from "@material-ui/lab/useAutocomplete";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Response from "./Response";
import { DoValidation } from "./types";

type InputProps = {
  type: string;
  doValidation?: DoValidation;
  label?: ReactNode;
  /*
  options?: any[];
  getOptionLabel?: (option: any) => string;
  label?: string;
  */
} & UseAutocompleteProps<any, boolean, boolean, boolean>;

const Input: FunctionComponent<InputProps> = ({
  type,
  options,
  getOptionLabel,
  doValidation,
  label,
}) => {
  return (
    <Response doValidation={doValidation}>
      {({
        doValidation,
        setResponse,
        index,
        setResponseInEdition,
        setIsValid,
        domRef,
      }) => (
        <Autocomplete
          ref={domRef}
          options={options || []}
          getOptionLabel={getOptionLabel}
          style={{ width: 300 }}
          onFocus={() => {
            !doValidation && setIsValid(true);
            setResponseInEdition(index);
          }}
          onBlur={() => setResponseInEdition(null)}
          onChange={(e, value) => setResponse(value, doValidation?.(value))}
          renderInput={(params) => (
            <TextField {...params} label={label} variant="outlined" />
          )}
        />
      )}
    </Response>
  );
};

export default Input;
