import { Paper, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';

import Select from '../../../ui/Forms/Select';
import TextField from '../../../ui/Forms/TextField';

const Login = () => {
  const { control } = useForm();

  return (
    <Stack
      spacing={2}
      alignItems={'center'}
      justifyContent={'center'}
      height={'100vh'}
    >
      <Paper sx={{ width: 600, padding: 2 }}>
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
