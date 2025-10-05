import {
  Box,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { createBrowserRouter, Link, RouterProvider } from 'react-router';

import Dashboard from './components/pages/Dashboard';

const theme = createTheme({
  typography: {
    fontFamily: ['Roboto, sans-serif'].join(','),
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/login',
    element: (
      <Box>
        <Typography variant="h1">Login</Typography>
        <Link to={'/'}>Back to Home</Link>
      </Box>
    ),
  },
]);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
