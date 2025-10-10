import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import * as Yup from 'yup';

import useDetailProjectContext from './useDetailProjectContext';

import services from '@/services';

const createListSchema = Yup.object({
  title: Yup.string().required(),
});

const useCreateNewList = () => {
  const detailProjectData = useLoaderData();
  const detailProjectContext = useDetailProjectContext();

  const [isLoadingCreateList, setLoadingCreateList] = useState(false);
  const [showFormCreateList, setShowFormCreateList] = useState(false);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      title: '',
      board_public_id: detailProjectData.public_id,
    },
    resolve: yupResolver(createListSchema),
  });

  const handleOpenFormCreateList = () => setShowFormCreateList(true);
  const handleCloseFormCreateList = async () => {
    setShowFormCreateList(false);
    setLoadingCreateList(false);
    reset();
    await detailProjectContext.fetchBoardLists();
  };

  const onSubmitCreateList = async (values) => {
    setLoadingCreateList(true);
    await services.lists.create(values);
    handleCloseFormCreateList();
  };

  return {
    isLoadingCreateList,
    showFormCreateList,
    control,
    handleSubmit,
    handleOpenFormCreateList,
    handleCloseFormCreateList,
    onSubmitCreateList,
  };
};

export default useCreateNewList;
