import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { createBrowserRouter, RouterProvider } from 'react-router';

import authLoader from './components/layouts/AuthLayout/AuthLayout.loader';
import sidebarLoader from './components/layouts/SidebarLayout/SidebarLayout.loader';
import Login from './components/pages/Auth/Login';
import SignUp from './components/pages/Auth/SignUp';
import Dashboard from './components/pages/Dashboard';
import Projects from './components/pages/Projects';
import DetailProject from './components/pages/Projects/DetailProject';
import Settings from './components/pages/Settings';

const theme = createTheme({
  typography: {
    fontFamily: ['Roboto', 'sans-serif'].join(','),
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    loader: sidebarLoader,
    element: <Dashboard />,
  },
  {
    path: '/login',
    loader: authLoader,
    element: <Login />,
  },
  {
    path: '/signup',
    loader: authLoader,
    element: <SignUp />,
  },
  {
    path: '/projects',
    loader: sidebarLoader,
    element: <Projects />,
  },
  {
    path: '/projects/:id',
    loader: sidebarLoader,
    element: <DetailProject />,
  },
  {
    path: '/settings',
    loader: sidebarLoader,
    element: <Settings />,
  },
]);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        <RouterProvider router={router} />
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
