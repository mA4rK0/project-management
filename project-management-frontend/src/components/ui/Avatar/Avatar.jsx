import { Avatar as BaseAvatar, Box, Popover, Typography } from '@mui/material';
import { useState } from 'react';

function stringToColor(string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name) {
  const initialName = name
    .split(' ')
    .map((n) => n[0])
    .join('');

  const displayName =
    initialName.length >= 2 ? initialName.substring(0, 2) : initialName;
  return {
    sx: {
      bgcolor: stringToColor(name),
      cursor: 'pointer',
    },
    children: `${displayName}`,
  };
}

const Avatar = ({ text, onClick }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (e) => setAnchorEl(e.currentTarget);
  const handlePopoverClose = () => setAnchorEl(null);

  return (
    <>
      <BaseAvatar
        {...stringAvatar(text)}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        onClick={onClick}
      />

      <Popover
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Box padding={1}>
          <Typography>{text}</Typography>
        </Box>
      </Popover>
    </>
  );
};

export default Avatar;
