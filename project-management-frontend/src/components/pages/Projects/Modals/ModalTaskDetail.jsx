// import { Delete } from '@mui/icons-material';
// import { Box, Button, colors, Stack, Typography } from '@mui/material';
// import dayjs from 'dayjs';

// import useModalTaskDetail from './hooks/useModalTaskDetail';

// import DatePicker from '@/components/ui/Forms/DatePicker';
// import TextField from '@/components/ui/Forms/TextField';
// import Modal from '@/components/ui/Modal';
// import datetime from '@/utils/datetime';
import ModalTaskDetailProvider from './ModalTaskDetailContext';

const ModalTaskDetail = () => {
  return (
    <ModalTaskDetailProvider>
      <ModalTaskDetail />
    </ModalTaskDetailProvider>
  );
};

export default ModalTaskDetail;
