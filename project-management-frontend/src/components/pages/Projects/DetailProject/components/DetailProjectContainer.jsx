import { colors, Paper, Typography } from '@mui/material';
import { useLoaderData } from 'react-router';

import useDetailProjectContext from '../hooks/useDetailProjectContext';

import SidebarLayout from '@/components/layouts/SidebarLayout';

const DetailProjectContainer = () => {
  const detailProjectData = useLoaderData();
  const detailProjectContext = useDetailProjectContext();

  return (
    <SidebarLayout
      pageTitle={`${detailProjectData.title} (${detailProjectContext.getProjectInitials})`}
      breadcrumbs={[
        {
          label: 'Project List',
          href: '/projects',
        },
        {
          label: detailProjectData.title,
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
