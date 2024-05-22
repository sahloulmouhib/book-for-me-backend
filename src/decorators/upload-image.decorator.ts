import {
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { IMAGE_FILE_TYPE, MAX_IMAGE_SIZE_BYTES } from 'src/constants';

export const UploadImage = () => {
  return UploadedFile(
    new ParseFilePipe({
      validators: [
        new FileTypeValidator({ fileType: IMAGE_FILE_TYPE }),
        new MaxFileSizeValidator({ maxSize: MAX_IMAGE_SIZE_BYTES }),
      ],
    }),
  );
};
