import { AccountCircle } from '@mui/icons-material';
import { Box, Stack } from '@mui/material';
import { grey } from '@mui/material/colors';

import Dropdown from '@/components/ui/Dropdown';

const Navbar = () => {
  return (
    <Box
      sx={{
        padding: 1,
        borderBottom: `1px solid ${grey[300]}`,
        background: '#ffffff',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1100,
      }}
    >
      <Stack justifyContent={'center'} alignItems={'flex-end'} paddingX={1}>
        <Dropdown
          icon={<AccountCircle />}
          options={[
            {
              label: 'Profile',
              onClick() {
                console.log('handle navigate to profile');
              },
            },
            {
              label: 'Logout',
              onClick() {
                console.log('handle logout');
              },
            },
          ]}
        />
      </Stack>
    </Box>
  );
};

export default Navbar;
