import { useContext } from 'react';

import { ModalTaskDetailContext } from '../ModalTaskDetailContext';

const useModalTaskDetailContext = () => {
  const modalTaskDetail = useContext(ModalTaskDetailContext);
  return modalTaskDetail;
};

export default useModalTaskDetailContext;
