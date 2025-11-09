import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData, useSearchParams } from 'react-router';

import useDetailProjectContext from '../../DetailProject/hooks/useDetailProjectContext';

import useModalTaskDetailContext from './useModalTaskDetailContext';

import services from '@/services';

const useModalTaskDetail = () => {
  const [_, setSearchParams] = useSearchParams();
  const [isLoading, setLoading] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [editDueDate, setEditDueDate] = useState(false);
  const [isShowConfirmDelete, setShowConfirmDelete] = useState(false);

  const detailProjectData = useLoaderData();
  const detailProjectContext = useDetailProjectContext();
  const modalTaskDetailContext = useModalTaskDetailContext();

  const taskId = modalTaskDetailContext.taskId;
  const listId = modalTaskDetailContext.listId;
  const taskDetailData = modalTaskDetailContext.taskDetailData;

  const formTask = useForm();

  const onSubmit = async (values) => {
    setLoading(true);

    await services.cards.update(taskDetailData.public_id, {
      list_id: listId,
      title: values.title ?? taskDetailData.title,
      due_date: values.due_date ?? taskDetailData.due_date,
      description: values.description ?? taskDetailData.description,
      position: taskDetailData.position,
    });
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

  return {
    taskDetailData,
    isLoading,
    editDescription,
    editTitle,
    editDueDate,
    isShowConfirmDelete,

    setLoading,
    setEditDescription,
    setEditTitle,
    setEditDueDate,
    setShowConfirmDelete,

    detailProjectData,

    taskId,
    listId,

    formTask,

    onSubmit,
    handleDeleteTask,
    handleClose,
  };
};

export default useModalTaskDetail;
