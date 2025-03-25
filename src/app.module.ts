import { AppInfrastructureModule } from '@infrastructure/app-infrastructure.module';
import { Module } from '@nestjs/common';

import { AppConfigModule } from '@shared/config/config.module';
import { AuthModule } from './shared/auth/auth.module';

@Module({
  imports: [AppConfigModule, AppInfrastructureModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
