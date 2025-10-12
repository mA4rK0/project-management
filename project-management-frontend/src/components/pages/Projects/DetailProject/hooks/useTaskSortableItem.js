import { useSortable } from '@dnd-kit/sortable';
import { useSearchParams } from 'react-router';

import useDetailProjectContext from './useDetailProjectContext';

import { DRAG_CARD } from '@/utils/constants';

const useTaskSortableItem = ({ id, item, listId }) => {
  const [, setSearchParams] = useSearchParams();

  const detailProjectContext = useDetailProjectContext();

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: {
      ...item,
      type: DRAG_CARD,
    },
  });

  const handleClickTaskItem = (e) => {
    e.stopPropagation();
    detailProjectContext.setIsOpenTaskDetail(true);
    setSearchParams({
      taskId: item.public_id,
      listId,
    });
  };

  return {
    detailProjectContext,
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    handleClickTaskItem,
  };
};

export default useTaskSortableItem;
