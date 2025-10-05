import { Box, Button } from '@mui/material';
import { useState } from 'react';

import Modal from '../../ui/Modal/Modal';

const Dashboard = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <Box>
      <Button type="button" variant="contained" onClick={handleOpen}>
        Open Modal
      </Button>
      <Modal open={openModal} handleClose={handleClose} title={'Modal Title'}>
        <Box
          sx={{
            padding: 2,
            width: 500,
          }}
        >
          Modal Content
        </Box>
      </Modal>
    </Box>
  );
};

export default Dashboard;
