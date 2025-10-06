import { Stack } from '@mui/material';

const AuthLayout = ({ children }) => {
  return (
    <Stack
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      height={'100vh'}
      width={'100%'}
    >
      {children}
    </Stack>
  );
};

export default AuthLayout;
