import { MenuItem, TextField } from "@mui/material";
import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";

type Option = {
  id: string | number;
  name: string;
};

interface Props {
  label: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  name: string;
  error?: string;
  type?: HTMLInputTypeAttribute;
  multiline?: boolean;
  autoFocus?: boolean;
  required?: boolean;
  select?: boolean;
  options?: Option[];
}

const FormElement = ({
  label,
  name,
  onChange,
  value,
  error,
  multiline,
  type,
  autoFocus,
  required,
  options,
  select,
}: Props) => {
  
  return (
    <TextField
      margin="normal"
      fullWidth
      id={name}
      label={label}
      name={name}
      autoComplete={name}
      autoFocus={autoFocus}
      value={value}
      onChange={onChange}
      error={!!error}
      helperText={error}
      type={type}
      multiline={multiline}
      required={required}
      select={select}
    >
      {select && options
        ? options?.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))
        : null}
    </TextField>
  );
};

export default FormElement;
