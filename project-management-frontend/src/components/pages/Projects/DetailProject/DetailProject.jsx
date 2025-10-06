import { Settings } from '@mui/icons-material';
import { Stack } from '@mui/material';

import Dropdown from '../../../ui/Dropdown';

const DetailProject = () => {
  return (
    <Stack
      sx={{
        height: '100vh',
        width: '100%',
      }}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Dropdown
        icon={<Settings />}
        options={[
          {
            label: 'Close this project',
            onClick: () => {
              console.log('handle close project');
            },
          },
          {
            label: 'Change deadline',
            onClick: () => {
              console.log('handle update deadline project');
            },
          },
        ]}
      />
    </Stack>
  );
};

export default DetailProject;
