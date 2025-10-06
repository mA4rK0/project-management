import { Box } from '@mui/material';

import SidebarMenu from './SidebarMenu';

const Sidebar = () => {
  return (
    <Box
      component={'aside'}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        flexGrow: 0,
        flexShrink: 0,
        borderRight: '1px solid #ccc',
        zIndex: 1000,
        paddingTop: '4rem', // Adjust for fixed navbar height
        background: '#ffffff',
      }}
    >
      <SidebarMenu />
    </Box>
  );
};

export default Sidebar;
