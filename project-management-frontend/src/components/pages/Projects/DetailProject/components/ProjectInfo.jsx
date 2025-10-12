import { Stack } from '@mui/material';

import ProjectMembers from './ProjectMembers';

const ProjectInfo = () => {
  return (
    <Stack
      justifyContent={'space-between'}
      alignItems={'center'}
      direction={'row'}
      mb={2}
    >
      <ProjectMembers />
    </Stack>
  );
};

export default ProjectInfo;
