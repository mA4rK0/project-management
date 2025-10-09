import { useContext } from 'react';

import { SnackbarContext } from './SnackbarContext';

const useSnackbar = () => {
  const snackbar = useContext(SnackbarContext);
  return snackbar;
};

export default useSnackbar;
