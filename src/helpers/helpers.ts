import { extname, join } from 'path';
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

export const getFilePathAndPath = (
  file: Express.Multer.File,
  directoryPath: string,
  fileStartName: string,
) => {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  const ext = extname(file.originalname);
  const filename = `${fileStartName}-${uniqueSuffix}${ext}`;
  const filePath = join(directoryPath, filename);
  return { filename, filePath };
};
