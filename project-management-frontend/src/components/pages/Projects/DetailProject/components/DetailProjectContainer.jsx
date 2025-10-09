import { colors, Paper, Typography } from '@mui/material';

import SidebarLayout from '@/components/layouts/SidebarLayout';

const DetailProjectContainer = () => {
  return (
    <SidebarLayout
      pageTitle="Project List"
      breadcrumbs={[
        {
          label: 'Project List',
          href: '/projects/:id',
        },
        {
          label: 'Software Engineering',
        },
      ]}
    >
      <Paper sx={{ padding: 2, background: colors.lightBlue[100] }}>
        <Typography> Show project list here</Typography>
      </Paper>
    </SidebarLayout>
  );
};

export default DetailProjectContainer;
