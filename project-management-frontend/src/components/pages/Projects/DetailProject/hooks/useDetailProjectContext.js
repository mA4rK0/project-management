import { useContext } from 'react';

import { DetailProjectContext } from '../DetailProjectContext';

const useDetailProjectContext = () => {
  const detailProject = useContext(DetailProjectContext);

  return detailProject;
};

export default useDetailProjectContext;
