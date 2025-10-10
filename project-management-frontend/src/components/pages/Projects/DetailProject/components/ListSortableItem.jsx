import { CSS } from '@dnd-kit/utilities';
import { Check, Close, Delete } from '@mui/icons-material';
import { Box, colors, IconButton, Stack, Typography } from '@mui/material';

import useListSortableItem from '../hooks/useListSortableItem';

import TaskItems from './TaskItems';

const ListSortableItem = ({ id, item }) => {
  const {
    sortable,
    droppable,
    handleDeleteList,
    isShowConfirmDelete,
    setShowConfirmDelete,
    taskItems,
  } = useListSortableItem({ id, item });
  const renderDeleteList = () => {
    if (isShowConfirmDelete) {
      return (
        <Stack direction={'row'} gap={1}>
          <IconButton
            size="small"
            color={'success'}
            onClick={handleDeleteList(item.public_id)}
          >
            <Check />
          </IconButton>
          <IconButton
            size="small"
            color={'default'}
            onClick={() => setShowConfirmDelete(false)}
          >
            <Close />
          </IconButton>
        </Stack>
      );
    }

    return (
      <IconButton
        size="small"
        color="error"
        onClick={() => setShowConfirmDelete(true)}
      >
        <Delete />
      </IconButton>
    );
  };

  return (
    <Box
      sx={{
        transform: CSS.Translate.toString(sortable.transform),
        transition: sortable.transition,
        flexBasis: 300,
        flexShrink: 0,
        overflowX: 'hidden',
        borderRadius: 1,
        px: 0.5,
        mx: -0.5,
        background: colors.grey[50],
      }}
      ref={sortable.setNodeRef}
      {...sortable.attributes}
      {...sortable.listeners}
    >
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        p={2}
        borderBottom={`1px solid ${colors.grey[300]}`}
        sx={{
          cursor: 'grab',
          borderTopRightRadius: 1,
          borderTopLeftRadius: 1,
        }}
      >
        <Stack direction={'row'} alignItems={'center'} gap={1}>
          <Typography variant="body1" fontWeight={600}>
            {item.title}
          </Typography>
          <Stack
            justifyContent={'center'}
            alignItems={'center'}
            sx={{
              width: 26,
              height: 26,
              borderRadius: 1,
              backgroundColor: colors.orange[100],
            }}
          >
            <Typography variant="caption" fontWeight={600}>
              {taskItems.length}
            </Typography>
          </Stack>
        </Stack>
        {renderDeleteList()}
      </Stack>
      <TaskItems listDroppable={droppable} listItem={item} />
    </Box>
  );
};

export default ListSortableItem;
