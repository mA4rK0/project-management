import { useState } from 'react';
import { useEffect } from 'react';
import { createContext } from 'react';
import { useSearchParams } from 'react-router';
import { useLoaderData } from 'react-router';

import services from '@/services';

const defaultState = {
  taskDetailData: {},
  setTaskDetailData() {},
  taskId: '',
  listId: '',
  membersData: [],
  setMembersData() {},
  async fetchTaskDetail() {},
  async fetchProjectMembers() {},
};

export const ModalTaskDetailContext = createContext(defaultState);

const ModalTaskDetailProvider = ({ children }) => {
  const detailProjectData = useLoaderData();
  const [searchParams] = useSearchParams();
  const [taskDetailData, setTaskDetailData] = useState({});
  const [membersData, setMembersData] = useState([]);

  const boardId = detailProjectData.public_id;

  const taskId = searchParams.get('taskId');
  const listId = searchParams.get('listId');

  const fetchTaskDetail = async (taskId) => {
    const response = await services.cards.getDetail(taskId);
    setTaskDetailData(response.data.data);
  };

  const fetchProjectMembers = async (boardId) => {
    const response = await services.boards.getMembers(boardId);
    setMembersData(response.data.data);
  };

  const initTaskDetail = async () => {
    await fetchTaskDetail(taskId);
    await fetchProjectMembers(boardId);
  };

  useEffect(() => {
    if (taskId && listId && boardId) {
      initTaskDetail();
    }
  }, [taskId, listId, boardId]);

  return (
    <ModalTaskDetailContext.Provider
      value={{
        taskId,
        listId,
        taskDetailData,
        fetchTaskDetail,
        fetchProjectMembers,
        membersData,
      }}
    >
      {children}
    </ModalTaskDetailContext.Provider>
  );
};

export default ModalTaskDetailProvider;
