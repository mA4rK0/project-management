import { colors, Paper, Typography } from '@mui/material';

import SidebarLayout from '@/components/layouts/SidebarLayout';

const Settings = () => {
  return (
    <SidebarLayout
      pageTitle="Settings"
      breadcrumbs={[
        {
          label: 'Settings',
          href: '/settings',
        },
      ]}
    >
      <Paper sx={{ padding: 2, background: colors.lightBlue[100] }}>
        <Typography> Show settings here</Typography>
      </Paper>
    </SidebarLayout>
  );
};

export default Settings;
