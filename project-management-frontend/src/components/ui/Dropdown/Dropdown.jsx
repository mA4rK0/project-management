import { IconButton, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';

const Dropdown = ({ options, icon }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton onClick={handleClick}>{icon}</IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {options?.map((option, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              option.onClick();
              handleClose();
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default Dropdown;
