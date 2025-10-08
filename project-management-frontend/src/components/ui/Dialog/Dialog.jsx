import {
  Dialog as BaseDialog,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

const Dialog = ({ open, onClose, title, message, actions }) => {
  return (
    <BaseDialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      {actions && actions.length > 0 && (
        <DialogActions>
          {actions.map((item, idx) => (
            <Button key={idx} onClick={item.onClick}>
              {item.label}
            </Button>
          ))}
        </DialogActions>
      )}
    </BaseDialog>
  );
};

export default Dialog;
