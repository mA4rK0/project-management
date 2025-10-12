import { GroupAdd } from '@mui/icons-material';
import { AvatarGroup, Button, Stack } from '@mui/material';

import ModalAddNewMember from '../../Modals/ModalAddNewMember';
import useDetailProjectContext from '../hooks/useDetailProjectContext';

import Avatar from '@/components/ui/Avatar';
import { AVATAR_GROUP_MAX } from '@/utils/constants';

const ProjectMembers = () => {
  const { members, setIsOpenModalAddNewMember } = useDetailProjectContext();

  const handleAddNewMember = () => setIsOpenModalAddNewMember(true);

  const renderAvatarMembers = () => {
    return (
      <AvatarGroup max={AVATAR_GROUP_MAX}>
        {members?.map((item) => (
          <Avatar key={item.id} text={item.name} />
        ))}
      </AvatarGroup>
    );
  };

  return (
    <>
      <Stack direction={'row'} alignItems={'center'} gap={2}>
        {renderAvatarMembers()}
        <Button
          variant="text"
          type="button"
          startIcon={<GroupAdd />}
          onClick={handleAddNewMember}
        >
          Add Member
        </Button>
      </Stack>
      <ModalAddNewMember />
    </>
  );
};

export default ProjectMembers;
