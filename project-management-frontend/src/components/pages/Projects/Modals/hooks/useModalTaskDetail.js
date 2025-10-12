import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData, useSearchParams } from 'react-router';

import useDetailProjectContext from '../../DetailProject/hooks/useDetailProjectContext';

import services from '@/services';

const useModalTaskDetail = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [taskDetailData, setTaskDetailData] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [editDueDate, setEditDueDate] = useState(false);
  const [editAssignee, setEditAssignee] = useState(false);
  const [isShowConfirmDelete, setShowConfirmDelete] = useState(false);

  const detailProjectData = useLoaderData();
  const detailProjectContext = useDetailProjectContext();

  const taskId = searchParams.get('taskId');
  const listId = searchParams.get('listId');

  const formTask = useForm();

  const fetchTaskDetail = async (taskId) => {
    const response = await services.cards.getDetail(taskId);
    setTaskDetailData(response.data.data);
  };

  const onSubmit = async (values) => {
    setLoading(true);

    await services.cards.update(taskDetailData.public_id, {
      list_id: listId,
      title: values.title ?? taskDetailData.title,
      due_date: values.due_date ?? taskDetailData.due_date,
      description: values.description ?? taskDetailData.description,
      position: taskDetailData.position,
    });
    await fetchTaskDetail(taskId);
    setLoading(false);
    setEditDescription(false);
    setEditTitle(false);
    setEditDueDate(false);
  };

  const handleDeleteTask = async () => {
    setLoading(true);
    await services.cards.remove(taskDetailData.public_id);
    handleClose();
  };

  const handleClose = async () => {
    setSearchParams({});
    setLoading(false);
    setShowConfirmDelete(false);
    await detailProjectContext.fetchBoardLists();
  };

  useEffect(() => {
    if (taskId && listId) {
      fetchTaskDetail(taskId);
    }
  }, [taskId, listId]);

  return {
    searchParams,
    taskDetailData,
    isLoading,
    editDescription,
    editTitle,
    editDueDate,
    editAssignee,
    isShowConfirmDelete,

    setSearchParams,
    setTaskDetailData,
    setLoading,
    setEditDescription,
    setEditTitle,
    setEditDueDate,
    setEditAssignee,
    setShowConfirmDelete,

    detailProjectData,
    detailProjectContext,

    taskId,
    listId,

    formTask,

    onSubmit,
    handleDeleteTask,
    handleClose,
  };
};

export default useModalTaskDetail;
