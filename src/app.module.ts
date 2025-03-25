import { AppInfrastructureModule } from '@infrastructure/app-infrastructure.module';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from '@shared/config/config.module';

@Module({
  imports: [AppConfigModule, AppInfrastructureModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
