import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';

import { Expose, Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

import { validatePlainInputSync } from '@common/utils/validation';
import { DATABASES } from '@common/constants/databases.enum';
import dbConfig from './db.config';

export class AppEnvVariables {
  @IsNumber()
  @Expose()
  @Transform(({ value }) => (value ? Number(value) : 3000))
  HTTP_PORT: number;
}

export interface AppConfig {
  httPort: number;
  db: Record<DATABASES, MongooseModuleFactoryOptions>;
}

export default (): AppConfig => {
  const envs = validatePlainInputSync(AppEnvVariables, process.env);

  return {
    httPort: envs.HTTP_PORT,
    db: dbConfig(),
  };
};
