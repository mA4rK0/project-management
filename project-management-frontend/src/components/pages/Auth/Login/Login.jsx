import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Paper, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';

import AuthLayout from '@/components/layouts/AuthLayout';
import TextField from '@/components/ui/Forms/TextField';
import services from '@/services';
import session from '@/utils/session';

const loginFormSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

const Login = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(loginFormSchema),
  });

  const onSubmit = async (formValues) => {
    setLoading(true);
    const response = await services.auth.login(formValues);
    session.setSession(response.data.data.access_token);
    setLoading(false);
    navigate('/');
  };

  return (
    <AuthLayout>
      <Paper
        sx={{
          padding: 2,
          width: 500,
        }}
      >
        <Typography
          variant="h5"
          component={'h1'}
          align="center"
          marginBottom={2}
        >
          Login
        </Typography>
        <Stack
          flexDirection={'column'}
          gap={1}
          component={'form'}
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField label={'Email'} control={control} name="email" />
          <TextField
            label={'Password'}
            control={control}
            name="password"
            secureText
          />
          <Button type="submit" variant="contained" loading={loading} fullWidth>
            Login to your account
          </Button>
          <Button
            type="button"
            variant="text"
            onClick={() => navigate('/signup')}
            fullWidth
          >
            Register new account
          </Button>
        </Stack>
      </Paper>
    </AuthLayout>
  );
};

export default Login;
