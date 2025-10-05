import { Paper, Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';

import DatePicker from '../../../ui/Forms/DatePicker';
import Select from '../../../ui/Forms/Select';
import TextField from '../../../ui/Forms/TextField';

const Login = () => {
  const { control } = useForm({
    defaultValues: {
      filterDate: dayjs(),
      username: 'agung',
    },
  });

  return (
    <Stack
      spacing={2}
      alignItems={'center'}
      justifyContent={'center'}
      height={'100vh'}
    >
      <Paper sx={{ width: 600, padding: 2 }}>
        <DatePicker
          name={'filterDate'}
          control={control}
          label={'Pick a date'}
        />
        <TextField name={'username'} control={control} label={'Username'} />
        <Select
          name={'category'}
          control={control}
          label={'Choose Category'}
          options={[
            {
              value: 'category 1',
              label: 'category 1',
            },
            {
              value: 'category 2',
              label: 'category 2',
            },
            {
              value: 'category 3',
              label: 'category 3',
            },
          ]}
        />
      </Paper>
    </Stack>
  );
};

export default Login;
