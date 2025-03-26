import { NestFactory } from '@nestjs/core';
import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import helmet from 'helmet';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from '@common/filters/http-exception.filter';
import { AppConfig } from '@shared/config/app.config';
import { swaggerSetup } from '@shared/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(helmet());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix('api', {
    exclude: [
      {
        method: RequestMethod.GET,
        path: '/healthz',
      },
      {
        method: RequestMethod.GET,
        path: '/liveness',
      },
    ],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableShutdownHooks();
  swaggerSetup(app);

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
