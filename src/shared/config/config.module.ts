import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { DATABASES } from 'src/common/constants/databases.enum';
import appConfig, { AppConfig } from './app.config';
import { ENVIRONMENTS } from '@common/constants/environments.enum';

const env = (process.env.NODE_ENV || '').toLowerCase();

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`${env}.env`, '.env'],
      ignoreEnvFile: process.env.NODE_ENV === ENVIRONMENTS.PROD,
      load: [appConfig],
      isGlobal: true,
      cache: true,
    }),
    MongooseModule.forRootAsync({
      connectionName: DATABASES.MONGO,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<AppConfig>) =>
        configService.get('db')[DATABASES.MONGO],
    }),
  ],
  controllers: [],
  providers: [ConfigModule, MongooseModule],
})
export class AppConfigModule {}
