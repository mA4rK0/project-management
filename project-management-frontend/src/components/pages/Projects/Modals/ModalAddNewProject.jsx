import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress, Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import DatePicker from '@/components/ui/Forms/DatePicker';
import TextField from '@/components/ui/Forms/TextField';
import Modal from '@/components/ui/Modal';
import { useSnackbar } from '@/components/ui/Snackbar';
import services from '@/services';
import datetime from '@/utils/datetime';

const addNewProjectSchema = Yup.object({
  title: Yup.string().required(),
  description: Yup.string().required(),
  due_date: Yup.string().required(),
});

const ModalAddNewProject = ({ open, handleClose }) => {
  const [isLoading, setLoading] = useState(false);

  const snackbar = useSnackbar();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      title: '',
      description: '',
      due_date: dayjs(),
    },
    resolver: yupResolver(addNewProjectSchema),
  });

  const onSubmit = async (values) => {
    setLoading(true);

    await services.boards.create({
      ...values,
      due_date: datetime.getIsoString(values.due_date),
    });

    snackbar.toggleSnackbar(true, 'Successfully created new project !');

    setLoading(false);
    reset();
    handleClose();
  };

  const renderLoading = () => {
    return (
      <Stack justifyContent={'center'} alignItems={'center'} height={300}>
        <CircularProgress />
      </Stack>
    );
  };
  const renderForm = () => {
    return (
      <Stack
        sx={{
          padding: 2,
        }}
      >
        <TextField control={control} label={'Project name'} name="title" />
        <TextField
          control={control}
          label={'Description'}
          name="description"
          multiline
          rows={5}
        />
        <DatePicker
          control={control}
          label={'Project deadline'}
          name="due_date"
          minDate={dayjs()}
        />
        <Stack
          direction={'row'}
          gap={1}
          justifyContent={'flex-end'}
          alignItems={'center'}
        >
          <Button type="submit" variant="contained">
            Save
          </Button>
          <Button type="button" variant="outlined">
            Cancel
          </Button>
        </Stack>
      </Stack>
    );
  };

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title={'Create new project'}
      sx={{
        minWidth: 400,
        maxWidth: 500,
      }}
    >
      <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
        {isLoading ? renderLoading() : renderForm()}
      </Box>
    </Modal>
  );
};

export default ModalAddNewProject;
