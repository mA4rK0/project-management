import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Box, colors, Paper, Stack, Typography } from '@mui/material';

import useTaskItems from '../hooks/useTaskItems';

import CreateNewTask from './CreateNewTask';
import TaskSortableItem from './TaskSortableItem';

import { DRAG_CARD } from '@/utils/constants';

const TaskItems = ({ listDroppable, listItem }) => {
  const { active } = listDroppable;

  const { taskItemDataIds, taskItemsData } = useTaskItems(listItem.public_id);

  const renderTaskDropZone = (listItem) => {
    const isCardDragging =
      active &&
      active.data.current.list_public_id !== listItem.public_id &&
      active.data.current.type === DRAG_CARD;

    if (isCardDragging) {
      return (
        <Box
          sx={{
            p: 1,
            position: 'absolute',
            width: '100%',
            zIndex: 1,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 1,
              bgcolor: colors.blue[50],
              borderStyle: 'dashed',
              borderColor: colors.blue[200],
            }}
          >
            <Stack
              sx={{
                height: 800,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography
                variant="body1"
                fontWeight={600}
                color={colors.blue[800]}
              >
                {listItem.title}
              </Typography>
            </Stack>
          </Paper>
        </Box>
      );
    }

    return <></>;
  };

  return (
    <Box
      sx={{
        height: 850,
        overflowY: 'auto',
        position: 'relative',
      }}
    >
      {renderTaskDropZone(listItem)}
      <Stack gap={2} p={1}>
        <SortableContext
          items={taskItemDataIds}
          strategy={verticalListSortingStrategy}
        >
          {taskItemsData?.map((item) => (
            <TaskSortableItem
              key={item.public_id}
              id={item.public_id}
              item={item}
              listId={listItem.public_id}
            />
          ))}
        </SortableContext>
        <CreateNewTask listId={listItem.public_id} />
      </Stack>
    </Box>
  );
};

export default TaskItems;
