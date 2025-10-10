import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Paper, Stack } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import * as Yup from 'yup';

import useDetailProjectContext from '../hooks/useDetailProjectContext';

import TextField from '@/components/ui/Forms/TextField';
import services from '@/services';

const createListSchema = Yup.object({
  title: Yup.string().required(),
});

const CreateNewList = () => {
  const detailProjectData = useLoaderData();
  const detailProjectContext = useDetailProjectContext();

  const [isLoadingCreateList, setLoadingCreateList] = useState(false);
  const [showFormCreateList, setShowFormCreateList] = useState(false);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      title: '',
      board_public_id: detailProjectData.public_id,
    },
    resolver: yupResolver(createListSchema),
  });

  const handleOpenFormCreateList = () => setShowFormCreateList(true);
  const handleCloseFormCreateList = () => setShowFormCreateList(false);

  const onSubmitCreateList = async (values) => {
    setLoadingCreateList(true);
    await services.lists.create(values);
    setLoadingCreateList(false);
    reset();
    handleCloseFormCreateList();
    await detailProjectContext.fetchBoardLists();
  };
  return (
    <Box
      sx={{
        flexBasis: 300,
        flexShrink: 0,
        overflowY: 'auto',
      }}
    >
      {showFormCreateList ? (
        <Paper
          sx={{ p: 1 }}
          component={'form'}
          onSubmit={handleSubmit(onSubmitCreateList)}
        >
          <TextField
            control={control}
            name={'title'}
            label={'task list name'}
            rows={1}
            fullWidth
            // autoFocus
          />
          <Stack direction={'row'} gap={1} justifyContent={'flex-end'}>
            <Button
              type="submit"
              variant="contained"
              size="small"
              disabled={isLoadingCreateList}
              loading={isLoadingCreateList}
            >
              Save
            </Button>
            <Button
              type="button"
              variant="outlined"
              size="small"
              onClick={handleCloseFormCreateList}
              disabled={isLoadingCreateList}
            >
              Cancel
            </Button>
          </Stack>
        </Paper>
      ) : (
        <Button
          fullWidth
          size="large"
          type="button"
          variant="contained"
          onClick={handleOpenFormCreateList}
          disableElevation
        >
          Create New List
        </Button>
      )}
    </Box>
  );
};

export default CreateNewList;
