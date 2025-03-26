import { UnprocessableException } from '@common/exceptions/api.exception';
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';

export function fileNameManager(
  req: Request,
  file: Express.Multer.File,
  cb: (error: Error | null, filename: string) => void,
) {
  const extension = file.mimetype.split('/')[1];
  const fileName = `${uuidv4()}.${extension}`;
  cb(null, fileName);
}

export function fileFilterImages(
  req: Request,
  file: Express.Multer.File,
  cb: (error: Error | null, accepted: boolean) => void,
) {
  if (
    [
      'image/jpeg',
      'image/png',
      'image/jpg',
      'image/webp',
      'image/svg+xml',
    ].some((e) => e === file.mimetype)
  ) {
    cb(null, true);
  } else {
    cb(new UnprocessableException('Unsupported file type'), false);
  }
}
