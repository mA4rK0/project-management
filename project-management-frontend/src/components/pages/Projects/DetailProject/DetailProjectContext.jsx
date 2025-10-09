import { arrayMove } from '@dnd-kit/sortable';
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useLoaderData } from 'react-router';

import services from '@/services';

const defaultState = {
  activeDragItem: null,
  setActiveDragItem() {},
  updateTaskItemPosition: {},
  setUpdateTaskItemPosition() {},
  overDragItem: null,
  setOverDragItem() {},
  isLoadingBoardLists: false,
  boardListData: [],
  getTaskItemsByListId() {},
  async fetchBoardLists() {},
  isOver: false,
  setIsOver() {},
  getProjectInitials() {},
  isOpenTaskDetail: false,
  setIsOpenTaskDetail() {},
  taskDetail: {},
  setTaskDetail() {},
  isOpenModalAddNewMember: false,
  setIsOpenModalAddNewMember() {},
  members: [],
  setMembers() {},
  isOpenModalEditProject: false,
  setIsOpenModalEditProject() {},
  activeOverItem: null,
  setActiveOverItem() {},
};

export const DetailProjectContext = createContext(defaultState);

const DetailProjectProvider = ({ children }) => {
  const detailProjectData = useLoaderData();

  const [updateTaskItemPosition, setUpdateTaskItemPosition] = useState();
  const [activeDragItem, setActiveDragItem] = useState(null);
  const [overDragItem, setOverDragItem] = useState(null);
  const [isOver, setIsOver] = useState(false);
  const [isOpenTaskDetail, setIsOpenTaskDetail] = useState(false);
  const [taskDetail, setTaskDetail] = useState({});
  const [isOpenModalAddNewMember, setIsOpenModalAddNewMember] = useState(false);
  const [members, setMembers] = useState([]);
  const [isOpenModalEditProject, setIsOpenModalEditProject] = useState(false);
  const [activeOverItem, setActiveOverItem] = useState(null);

  const [isLoadingBoardLists, setLoadingBoardLists] = useState(false);
  const [boardListData, setBoardListData] = useState([]);
  const [boardListWithCardsData, setBoardListWithCardsData] = useState([]);

  const fetchBoardLists = async () => {
    try {
      setLoadingBoardLists(true);
      const response = await services.boards.lists(detailProjectData.public_id);
      setBoardListData(response.data.data.Lists);

      const listIds = response.data.data.Lists.map((item) => {
        return {
          internal_id: item.internal_id,
          public_id: item.public_id,
        };
      });
      const responseCards = await Promise.all(
        listIds.map((item) => services.lists.getCards(item.public_id)),
      );

      const boardListWithCards = [];

      responseCards.forEach((response) => {
        const cards = response.data.data;
        cards.forEach((card) => {
          const cardExist = boardListWithCards.findIndex(
            (item) => item.public_id === card.public_id,
          );
          if (cardExist === -1) {
            const listIdx = listIds.findIndex(
              (list) => list.internal_id === card.list_internal_id,
            );
            boardListWithCards.push({
              ...card,
              list_internal_id: listIds[listIdx].internal_id,
              list_public_id: listIds[listIdx].public_id,
            });
          }
        });
      });

      setBoardListWithCardsData(boardListWithCards);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingBoardLists(false);
    }
  };

  const getTaskItemsByListId = useCallback(
    (listId) => {
      return boardListWithCardsData.filter(
        (item) => item.list_public_id === listId,
      );
    },
    [boardListWithCardsData],
  );

  const getProjectInitials = useMemo(() => {
    if (detailProjectData.title) {
      // get only first letter of each word
      const words = detailProjectData.title.split(' ');
      let initials = words.map((word) => word.charAt(0).toUpperCase()).join('');

      return initials;
    }
  }, [detailProjectData]);

  useEffect(() => {
    if (detailProjectData.public_id) {
      fetchBoardLists();
    }
  }, [detailProjectData.public_id]);

  useEffect(() => {
    const fetchUpdateTaskItemPosition = async () => {
      if (updateTaskItemPosition) {
        if (updateTaskItemPosition.isDragListType) {
          // Arrange List Position
          const oldIndex = [...boardListData].findIndex(
            (item) =>
              item.public_id === updateTaskItemPosition.active.public_id,
          );
          const newIndex = [...boardListData].findIndex(
            (item) => item.public_id === updateTaskItemPosition.over.public_id,
          );
          const updateBoardListData = arrayMove(
            boardListData,
            oldIndex,
            newIndex,
          );
          setBoardListData(updateBoardListData);
          const boardListDataIds = updateBoardListData.map(
            (item) => item.public_id,
          );
          await services.boards.updateListsPosition(
            detailProjectData.public_id,
            boardListDataIds,
          );
          // await fetchBoardLists();
        } else {
          const { isSameList, active, over } = updateTaskItemPosition;
          if (isSameList) {
            // Move in the same list

            const oldIndex = [...boardListWithCardsData].findIndex(
              (item) => item.public_id === active.public_id,
            );
            const newIndex = [...boardListWithCardsData].findIndex(
              (item) => item.public_id === over.public_id,
            );
            const updatedCards = arrayMove(
              boardListWithCardsData,
              oldIndex,
              newIndex,
            );

            const cardIds = updatedCards.map((item) => item.public_id);
            await services.lists.updateCardPositions(
              active.list_public_id,
              cardIds,
            );
            setBoardListWithCardsData(updatedCards);
          } else {
            // Move to another list

            await services.cards.update(active.public_id, {
              ...active,
              list_id: over.list_public_id || over.public_id,
            });

            setBoardListWithCardsData((prevState) => {
              return prevState.map((item) => {
                if (item.public_id === active.public_id) {
                  return {
                    ...item,
                    list_public_id: over.list_public_id || over.public_id,
                  };
                }
                return item;
              });
            });
          }
          await fetchBoardLists();
        }
      }
    };
    fetchUpdateTaskItemPosition();
  }, [updateTaskItemPosition]);

  const fetchBoardMembers = async () => {
    const response = await services.boards.getMembers(
      detailProjectData.public_id,
    );
    setMembers(response.data.data);
  };

  useEffect(() => {
    fetchBoardMembers();
  }, []);

  return (
    <DetailProjectContext.Provider
      value={{
        isLoadingBoardLists,
        updateTaskItemPosition,
        overDragItem,
        activeDragItem,
        boardListData,
        isOver,
        getProjectInitials,
        isOpenTaskDetail,
        taskDetail,
        isOpenModalAddNewMember,
        members,
        isOpenModalEditProject,
        activeOverItem,

        getTaskItemsByListId,
        setUpdateTaskItemPosition,
        setActiveDragItem,
        setOverDragItem,
        fetchBoardLists,
        setIsOver,
        setIsOpenTaskDetail,
        setTaskDetail,
        setIsOpenModalAddNewMember,
        fetchBoardMembers,
        setIsOpenModalEditProject,
        setActiveOverItem,
      }}
    >
      {children}
    </DetailProjectContext.Provider>
  );
};

export default DetailProjectProvider;
