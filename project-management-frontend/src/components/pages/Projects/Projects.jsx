import { Box, Button, Link, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useDebounce } from 'use-debounce';

import SidebarLayout from '@/components/layouts/SidebarLayout';
import TextField from '@/components/ui/Forms/TextField';
import Table from '@/components/ui/Table';
import services from '@/services';
import datetime from '@/utils/datetime';

const Projects = () => {
  const [isLoading, setLoading] = useState(false);
  const [boardsData, setBoardsData] = useState([]);

  const { control } = useForm({
    defaultValues: {
      search: '',
    },
  });

  const watchSearch = useWatch({
    control,
    name: 'search',
  });

  const [debounceSearch] = useDebounce(watchSearch, 1000);

  useEffect(() => {
    const fetchBoardsData = async () => {
      setLoading(true);
      const response = await services.boards.myBoards({
        filter: debounceSearch,
      });
      setBoardsData(response.data.data);
      setLoading(false);
    };

    fetchBoardsData();
  }, [debounceSearch]);

  return (
    <SidebarLayout
      pageTitle="Project List"
      breadcrumbs={[
        {
          label: 'Project List',
        },
      ]}
    >
      <Stack>
        <Box>
          <TextField
            control={control}
            label={'Search project name'}
            id="search"
            name="search"
            size="small"
          />
        </Box>
      </Stack>
      <Table
        isLoading={isLoading}
        data={boardsData}
        columns={[
          {
            id: 'title',
            label: 'Project name',
          },
          {
            id: 'description',
            label: 'Description',
          },
          {
            id: 'title',
            label: 'Created at',
            render(data) {
              return (
                <Box>{datetime.format(data.created_at, 'DD/MM/YYYY')}</Box>
              );
            },
          },
          {
            id: 'title',
            label: 'Action',
            render(data) {
              return (
                <Link to={`/projects/${data.public_id}`}>
                  <Button type="button" variant="outlined">
                    Project Detail
                  </Button>
                </Link>
              );
            },
          },
        ]}
      />
    </SidebarLayout>
  );
};

export default Projects;
