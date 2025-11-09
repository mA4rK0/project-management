import { useState } from 'react';
import { useForm } from 'react-hook-form';

import useModalTaskDetailContext from './useModalTaskDetailContext';

import services from '@/services';

const useTaskAssignees = () => {
  const { fetchTaskDetail, taskId, membersData, taskDetailData } =
    useModalTaskDetailContext();

  const formTaskAssignees = useForm({
    defaultValues: {
      members: [],
    },
  });

  const [isLoading, setLoading] = useState(false);
  const [showFormAssignees, setShowFormAssignees] = useState(false);

  const onSubmitTaskAssignees = async (values) => {
    setLoading(true);
    await services.cards.addAssignees(taskDetailData.public_id, values.members);
    await fetchTaskDetail(taskId);
    setLoading(false);
  };

  return {
    isLoading,
    membersData,
    formTaskAssignees,
    onSubmitTaskAssignees,
    taskDetailData,
    showFormAssignees,
    setShowFormAssignees,
  };
};

export default useTaskAssignees;
