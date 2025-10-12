import { Delete } from '@mui/icons-material';
import { Box, Button, colors, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';

import useModalTaskDetail from './hooks/useModalTaskDetail';

import DatePicker from '@/components/ui/Forms/DatePicker';
import TextField from '@/components/ui/Forms/TextField';
import Modal from '@/components/ui/Modal';
import datetime from '@/utils/datetime';

const ModalTaskDetail = () => {
  const {
    taskId,
    handleClose,
    taskDetailData,
    editTitle,
    setEditTitle,
    formTask,
    onSubmit,
    isLoading,
    editDescription,
    setEditDescription,
    editDueDate,
    setEditDueDate,
    detailProjectData,
    isShowConfirmDelete,
    setShowConfirmDelete,
    handleDeleteTask,
  } = useModalTaskDetail();

  const renderTitle = () => {
    return (
      <Stack gap={2}>
        <Typography variant="h5" fontWeight={700}>
          Title
        </Typography>
        {editTitle ? (
          <Box component={'form'} onSubmit={formTask.handleSubmit(onSubmit)}>
            <TextField
              control={formTask.control}
              name={'title'}
              fullWidth
              disabled={isLoading}
            />
            <Stack direction={'row'} justifyContent={'flex-end'} gap={1}>
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                loading={isLoading}
              >
                Save
              </Button>

              <Button
                type="button"
                variant="outlined"
                onClick={() => setEditTitle(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
            </Stack>
          </Box>
        ) : (
          <Typography
            component={'a'}
            variant="body2"
            sx={{
              display: 'block',
              ':hover': {
                background: colors.grey[100],
                cursor: 'pointer',
                p: 1,
                borderRadius: 1,
              },
            }}
            onClick={() => setEditTitle(true)}
          >
            {taskDetailData.title || 'No title, click to add'}
          </Typography>
        )}
      </Stack>
    );
  };

  const renderDescription = () => {
    return (
      <Stack gap={2}>
        <Typography variant="h5" fontWeight={700}>
          Task Description
        </Typography>
        {editDescription ? (
          <Box component={'form'} onSubmit={formTask.handleSubmit(onSubmit)}>
            <TextField
              control={formTask.control}
              name={'description'}
              multiline
              rows={10}
              fullWidth
              disabled={isLoading}
            />
            <Stack direction={'row'} justifyContent={'flex-end'} gap={1}>
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                loading={isLoading}
              >
                Save
              </Button>

              <Button
                type="button"
                variant="outlined"
                onClick={() => setEditDescription(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
            </Stack>
          </Box>
        ) : (
          <Typography
            component={'a'}
            variant="body2"
            sx={{
              display: 'block',
              ':hover': {
                background: colors.grey[100],
                cursor: 'pointer',
                p: 1,
                borderRadius: 1,
              },
            }}
            onClick={() => setEditDescription(true)}
          >
            {taskDetailData.description || 'No task description, click to add'}
          </Typography>
        )}
      </Stack>
    );
  };

  const renderDueDate = () => {
    return (
      <Stack gap={2}>
        <Typography variant="h5" fontWeight={700}>
          Deadline
        </Typography>
        {editDueDate ? (
          <Box component={'form'} onSubmit={formTask.handleSubmit(onSubmit)}>
            <DatePicker
              control={formTask.control}
              name={'due_date'}
              fullWidth
              disabled={isLoading}
              minDate={dayjs()}
              maxDate={dayjs(detailProjectData.due_date)}
            />

            <Stack direction={'row'} justifyContent={'flex-end'} gap={1}>
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                loading={isLoading}
              >
                Save
              </Button>

              <Button
                type="button"
                variant="outlined"
                onClick={() => setEditDueDate(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
            </Stack>
          </Box>
        ) : (
          <Typography
            component={'a'}
            variant="body2"
            sx={{
              display: 'block',
              ':hover': {
                background: colors.grey[100],
                cursor: 'pointer',
                p: 1,
                borderRadius: 1,
              },
            }}
            onClick={() => setEditDueDate(true)}
          >
            {taskDetailData.due_date &&
            taskDetailData.due_date === '0001-01-01T00:00:00Z'
              ? 'No deadline, click to add'
              : datetime.format(taskDetailData.due_date, 'DD MMMM YYYY')}
          </Typography>
        )}
      </Stack>
    );
  };

  const renderTaskDetailActions = () => {
    return (
      <Stack
        sx={{
          position: 'sticky',
          bottom: 0,
          background: 'white',
          p: 2,
          borderTop: `1px solid ${colors.grey[300]}`,
        }}
        direction={'row'}
        justifyContent={'flex-end'}
        gap={1}
      >
        {isShowConfirmDelete ? (
          <Stack direction={'row'} gap={1} alignItems={'center'}>
            <Typography variant="body2">
              Are you sure you want to delete this task?
            </Typography>
            <Button
              type="button"
              color="error"
              onClick={handleDeleteTask}
              disabled={isLoading}
            >
              Yes
            </Button>
            <Button
              variant="text"
              onClick={() => setShowConfirmDelete(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </Stack>
        ) : (
          <>
            <Button
              startIcon={<Delete />}
              variant="outlined"
              color="error"
              onClick={() => setShowConfirmDelete(true)}
              disabled={isLoading}
            >
              Delete
            </Button>
            <Button
              variant="outlined"
              onClick={handleClose}
              disabled={isLoading}
            >
              Close
            </Button>
          </>
        )}
      </Stack>
    );
  };

  return (
    <Modal
      open={taskId}
      handleClose={handleClose}
      title={taskDetailData?.title || ''}
    >
      <Stack
        direction={'row'}
        gap={2}
        alignItems={'flex-start'}
        justifyContent={'space-between'}
        sx={{
          width: 1000,
          height: 600,
          overflowY: 'auto',
          p: 2,
        }}
      >
        <Stack width={'65%'} gap={2}>
          {renderTitle()}
          {renderDescription()}
        </Stack>
        <Stack width={'35%'} gap={2}>
          {renderDueDate()}
        </Stack>
      </Stack>
      {renderTaskDetailActions()}
    </Modal>
  );
};

export default ModalTaskDetail;
