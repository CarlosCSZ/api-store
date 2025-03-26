export interface IUploadResponse {
  key: string;
  url: string;
}

export abstract class BucketStorage {
  abstract uploadFile(file: Express.Multer.File): Promise<IUploadResponse>;
  abstract signUrl(key: string): string;
}
