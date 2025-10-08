import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Paper, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';

import AuthLayout from '@/components/layouts/AuthLayout';
import Dialog from '@/components/ui/Dialog';
import TextField from '@/components/ui/Forms/TextField';
import services from '@/services';

const signUpSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .required('Email is required')
    .email('Email format is invalid'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .required('Password confirmation is required')
    .oneOf([Yup.ref('password'), null], 'Password confirmation does not match'),
});

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState({
    title: '',
    message: '',
  });
  const [dialogActions, setDialogActions] = useState([]);

  const navigate = useNavigate();

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = async (formValues) => {
    setLoading(true);
    try {
      await services.auth.signUp(formValues);
      navigate('/login');
    } catch (error) {
      setOpenDialog(true);
      setDialogMessage({
        title: 'Oops...',
        message: error?.response?.data?.message ?? 'Please try again.',
      });
      setDialogActions([
        {
          label: 'Okay',
          onClick() {
            setOpenDialog(false);
          },
        },
      ]);
    } finally {
      setLoading(false);
    }
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
          Sign Up
        </Typography>
        <Stack
          flexDirection={'column'}
          gap={1}
          component={'form'}
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField id={'name'} label={'Nama'} control={control} name="name" />
          <TextField
            id={'email'}
            label={'Email'}
            control={control}
            name="email"
          />
          <TextField
            label={'Password'}
            control={control}
            name="password"
            secureText
          />
          <TextField
            label={'Password Confirmation'}
            control={control}
            name="confirmPassword"
            secureText
          />
          <Button type="submit" variant="contained" loading={loading} fullWidth>
            Register New Account
          </Button>
          <Button
            type="button"
            variant="text"
            onClick={() => navigate('/login')}
            fullWidth
          >
            Already have an account? Login now
          </Button>
        </Stack>
      </Paper>
      <Dialog open={openDialog} actions={dialogActions} {...dialogMessage} />
    </AuthLayout>
  );
};

export default SignUp;
