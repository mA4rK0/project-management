import {
  Box,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { createBrowserRouter, Link, RouterProvider } from 'react-router';

import Table from './components/ui/Table';

const theme = createTheme({
  typography: {
    fontFamily: ['Roboto, sans-serif'].join(','),
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Box>
        <Table
          columns={[
            {
              id: 'task',
              label: 'Task',
            },
            {
              id: 'status',
              label: 'Status',
            },
          ]}
          data={[
            {
              id: 1,
              task: 'Task 1',
              status: 'New',
            },
            {
              id: 2,
              task: 'Task 2',
              status: 'In progress',
            },
            {
              id: 3,
              task: 'Task 3',
              status: 'Done',
            },
          ]}
        />
      </Box>
    ),
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
