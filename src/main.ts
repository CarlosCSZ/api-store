import { NestFactory } from '@nestjs/core';

import helmet from 'helmet';

import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from '@common/filters/http-exception.filter';
import { AppConfig } from '@shared/config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(helmet());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableShutdownHooks();

  const config = app.get<ConfigService<AppConfig>>(ConfigService);
  try {
    await app.listen(config.get<number>('httPort') ?? 3000);
    console.log(`API Store is running on: ${await app.getUrl()}`);
  } catch (error) {
    console.error({ err: error }, 'Application start error');
    process.exit(1);
  }
}
bootstrap();
