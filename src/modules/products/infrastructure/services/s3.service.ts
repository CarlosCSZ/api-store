import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { v4 as uuidv4 } from 'uuid';
import * as AWS from 'aws-sdk';

import { InternalServerErrorException } from '@common/exceptions/api.exception';
import { IAppConfig } from '@shared/config/app.config';
import { IAwsConfig } from '@shared/config/aws.config';
import {
  BucketStorage,
  IUploadResponse,
} from '../../domain/storage/bucket.storage';

@Injectable()
export class S3Service implements BucketStorage {
  private readonly logger = new Logger(S3Service.name);
  private readonly bucketName: string;
  private readonly s3: AWS.S3;

  constructor(private readonly configService: ConfigService<IAppConfig>) {
    const awsConfig = this.configService.get<IAwsConfig>('aws') as IAwsConfig;
    this.bucketName = awsConfig.bucket;
    this.s3 = new AWS.S3({
      accessKeyId: awsConfig.accessKey,
      secretAccessKey: awsConfig.secretKey,
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<IUploadResponse> {
    const key = `${uuidv4()}-${file.originalname}`;
    const params = {
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer,
    };
    try {
      await this.s3.putObject(params).promise();

      return { key, url: this.signUrl(key) };
    } catch (error) {
      this.logger.error({ method: 'uploadFile', error });
      throw new InternalServerErrorException('Error uploading file');
    }
  }

  signUrl(key: string): string {
    const params = {
      Bucket: this.bucketName,
      Key: key,
      Expires: 120,
    };

    return this.s3.getSignedUrl('getObject', params);
  }
}
