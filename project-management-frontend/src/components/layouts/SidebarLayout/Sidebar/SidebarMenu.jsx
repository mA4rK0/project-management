import { Book, Monitor, Settings } from '@mui/icons-material';
import { Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { useNavigate } from 'react-router';

const SidebarMenu = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ width: 200, paddingTop: 1 }}>
      <MenuList>
        <MenuItem onClick={() => navigate('/')} sx={{ position: 'relative' }}>
          <ListItemIcon>
            <Monitor fontSize="small" />
          </ListItemIcon>
          <ListItemText>Dashboard</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => navigate('/projects')}>
          <ListItemIcon>
            <Book fontSize="small" />
          </ListItemIcon>
          <ListItemText>Project List</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => navigate('/settings')}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          <ListItemText>Settings</ListItemText>
        </MenuItem>
      </MenuList>
    </Box>
  );
};

export default SidebarMenu;
