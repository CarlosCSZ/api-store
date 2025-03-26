import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import { HealthzController } from './healthz.controller';
import { HealthzService } from './healthz.service';

@Module({
  imports: [
    TerminusModule.forRoot({
      logger: false,
      errorLogStyle: 'json',
    }),
  ],
  controllers: [HealthzController],
  providers: [HealthzService],
})
export class HealthzModule {}
