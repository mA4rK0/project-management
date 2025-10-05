import { TextField as BaseTextField, Box } from '@mui/material';
import { Controller } from 'react-hook-form';

const TextField = ({
  control,
  name,
  label,
  defaultValue,
  helperText,
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { value, onChange, onBlur } }) => {
        return (
          <Box sx={{ marginBottom: 2 }}>
            <BaseTextField
              {...props}
              fullWidth
              label={label}
              variant="outlined"
              value={value}
              onBlur={onBlur}
              onChange={onChange}
            />
          </Box>
        );
      }}
    />
  );
};

export default TextField;
