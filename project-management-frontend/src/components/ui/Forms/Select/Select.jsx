import {
  Select as BaseSelect,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
} from '@mui/material';
import { Controller } from 'react-hook-form';

const Select = ({
  control,
  label,
  helperText,
  name,
  id,
  options,
  defaultValue,
  ...props
}) => {
  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      render={({ field: { value, onChange, onBlur } }) => {
        const handleChange = (e) => {
          onChange(e.target.value);
        };
        return (
          <FormControl fullWidth>
            <InputLabel id={id}>{label}</InputLabel>
            <BaseSelect
              {...props}
              labelId={id}
              id={`select-${id}`}
              value={value}
              label={label}
              onChange={handleChange}
              onBlur={onBlur}
            >
              {options?.map((option, index) => (
                <MenuItem key={index} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </BaseSelect>
            <FormHelperText>{helperText}</FormHelperText>
          </FormControl>
        );
      }}
    />
  );
};

export default Select;
