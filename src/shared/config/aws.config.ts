import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

import { validatePlainInputSync } from '@common/utils';

export class AWSEnvVariables {
  @IsString()
  @Expose()
  AWS_KEY_ID: string;

  @IsString()
  @Expose()
  AWS_SECRET_KEY: string;

  @IsString()
  @Expose()
  AWS_BUCKET_NAME: string;
}

export interface IAwsConfig {
  accessKey: string;
  secretKey: string;
  bucket: string;
}

export default (): IAwsConfig => {
  const envs = validatePlainInputSync(AWSEnvVariables, process.env);

  return {
    accessKey: envs.AWS_KEY_ID,
    secretKey: envs.AWS_SECRET_KEY,
    bucket: envs.AWS_BUCKET_NAME,
  };
};
