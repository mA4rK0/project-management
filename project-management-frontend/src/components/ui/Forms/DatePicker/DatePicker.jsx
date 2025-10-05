import { Box } from '@mui/material';
import { DatePicker as BaseDatePicker } from '@mui/x-date-pickers';
import { Controller } from 'react-hook-form';

const DatePicker = ({
  control,
  name,
  label,
  defaultValue,
  helperText,
  sx,
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { value, onChange } }) => {
        return (
          <Box sx={{ marginBottom: 2 }}>
            <BaseDatePicker
              {...props}
              sx={{
                width: '100%',
                ...sx,
              }}
              label={label}
              variant={'outlined'}
              value={value}
              onChange={onChange}
              helperText={helperText}
            />
          </Box>
        );
      }}
    />
  );
};

export default DatePicker;
