import { User } from 'src/users/user.entity';
import { UserRoleEnum } from 'src/users/users.enums';

export const isAdminOrAllowedUser = (
  userToCheck: User,
  allowedUserId: string,
) => {
  return (
    userToCheck.role == UserRoleEnum.Admin || allowedUserId == userToCheck.id
  );
};
