import { Close } from '@mui/icons-material';
import {
  Modal as BaseModal,
  Box,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

const Modal = ({ title, open, handleClose, sx, children, ...props }) => {
  return (
    <BaseModal {...props} open={open} onClose={handleClose}>
      <Box
        sx={{
          borderRadius: 1,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: 1200,
          maxHeight: 800,
          bgcolor: 'background.paper',
          boxShadow: 24,
          ...sx,
        }}
      >
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          spacing={2}
          sx={{
            p: 2,
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          <Typography variant="h6" component={'h2'}>
            {title}
          </Typography>
          <IconButton type="button" onClick={handleClose}>
            <Close />
          </IconButton>
        </Stack>
        <Box
          sx={{
            maxHeight: 600,
            overflowY: 'auto',
          }}
        >
          {children}
        </Box>
      </Box>
    </BaseModal>
  );
};

export default Modal;
