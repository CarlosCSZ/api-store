import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';

import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

import { DATABASES } from '@common/constants/databases.enum';
import { validatePlainInputSync } from '@common/utils/validation';
import { ENVIRONMENTS } from '@common/constants/environments.enum';

export class DBEnvVariables {
  @IsString()
  @Expose()
  MONGO_URI: string;

  @IsString()
  @Expose()
  @IsOptional()
  DB_NAME?: string;
}

export default (): Record<DATABASES, MongooseModuleFactoryOptions> => {
  const envs = validatePlainInputSync(DBEnvVariables, process.env);
  const dbName = envs.DB_NAME ?? `${ENVIRONMENTS.DEV}_store`;
  return {
    [DATABASES.MONGO]: {
      uri: envs.MONGO_URI,
      dbName,
    },
  };
};
