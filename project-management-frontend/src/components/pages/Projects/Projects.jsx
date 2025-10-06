import { colors, Paper, Typography } from '@mui/material';

import SidebarLayout from '@/components/layouts/SidebarLayout';

const Projects = () => {
  return (
    <SidebarLayout
      pageTitle="Projects"
      breadcrumbs={[
        {
          label: 'Projects',
          href: '/projects',
        },
      ]}
    >
      <Paper sx={{ padding: 2, background: colors.lightBlue[100] }}>
        <Typography> Show projects here</Typography>
      </Paper>
    </SidebarLayout>
  );
};

export default Projects;
