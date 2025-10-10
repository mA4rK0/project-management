import { useSortable } from '@dnd-kit/sortable';

import useDetailProjectContext from './useDetailProjectContext';

import { DRAG_CARD } from '@/utils/constants';

const useTaskItems = ({ id, item }) => {
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

  return {
    detailProjectContext,
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  };
};

export default useTaskItems;
