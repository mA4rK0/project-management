import { Box, Button, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Link } from 'react-router';
import { useDebounce } from 'use-debounce';

import ModalAddNewProject from './Modals/ModalAddNewProject';

import SidebarLayout from '@/components/layouts/SidebarLayout';
import TextField from '@/components/ui/Forms/TextField';
import Pagination from '@/components/ui/Pagination';
import Table from '@/components/ui/Table';
import services from '@/services';
import datetime from '@/utils/datetime';

const Projects = () => {
  const [isLoading, setLoading] = useState(false);
  const [boardsData, setBoardsData] = useState([]);
  const [boardsMeta, setBoardsMeta] = useState({});
  const [page, setPage] = useState(1);

  const [openModalAddNewProject, setOpenModalAddNewProject] = useState(false);

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

  const fetchBoardsData = async () => {
    setLoading(true);
    try {
      const response = await services.boards.myBoards({
        filter: debounceSearch,
        limit: 10,
        page,
      });
      setBoardsData(response.data.data);
      setBoardsMeta(response.data.meta);
    } catch (error) {
      console.error('Failed to fetch boards:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoardsData();
  }, [debounceSearch, page]);

  const handleOpenAddNewProject = () => setOpenModalAddNewProject(true);
  const handleCloseAddNewProject = async () => {
    await fetchBoardsData();
    setOpenModalAddNewProject(false);
  };

  return (
    <>
      <SidebarLayout
        pageTitle="Project Lists"
        breadcrumbs={[
          {
            label: 'Project Lists',
          },
        ]}
      >
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Box>
            <TextField
              control={control}
              label={'Search project name'}
              id="search"
              name="search"
              size="small"
            />
          </Box>
          <Box>
            <Button
              type="button"
              variant="contained"
              onClick={handleOpenAddNewProject}
            >
              Create new project
            </Button>
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
              id: 'created_at',
              label: 'Date created',
              render(data) {
                return (
                  <Box>{datetime.format(data.created_at, 'DD/MM/YYYY')}</Box>
                );
              },
            },
            {
              id: 'action',
              label: 'Action',
              render(data) {
                return (
                  <Link to={`/projects/${data.public_id}`}>
                    <Button type="button" variant="outlined">
                      Project details
                    </Button>
                  </Link>
                );
              },
            },
          ]}
        />
        <Pagination
          count={boardsMeta.total_pages}
          onChange={(e, page) => {
            setPage(page);
          }}
        />
      </SidebarLayout>
      <ModalAddNewProject
        open={openModalAddNewProject}
        handleClose={handleCloseAddNewProject}
      />
    </>
  );
};

export default Projects;
