import { useMemo } from 'react';

import useDetailProjectContext from './useDetailProjectContext';

const useTaskItems = (listId) => {
  const detailProjectContext = useDetailProjectContext();
  const taskItemsData = detailProjectContext.getTaskItemsByListId(listId);

  const taskItemDataIds = useMemo(() => {
    return taskItemsData.map((item) => item.public_id);
  }, [taskItemsData]);

  return {
    detailProjectContext,
    taskItemsData,
    taskItemDataIds,
  };
};

export default useTaskItems;
