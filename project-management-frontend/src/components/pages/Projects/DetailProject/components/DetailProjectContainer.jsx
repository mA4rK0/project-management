import { Stack } from '@mui/material';
import { useLoaderData } from 'react-router';

import useDetailProjectContext from '../hooks/useDetailProjectContext';

import CreateNewList from './CreateNewList';

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
      <Stack
        sx={{
          height: 800,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          direction: 'row',
          gap: 2,
          overflowX: 'auto',
          pb: 5,
        }}
      >
        <CreateNewList />
      </Stack>
    </SidebarLayout>
  );
};

export default DetailProjectContainer;
