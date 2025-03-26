import { Injectable } from '@nestjs/common';
import { MongooseHealthIndicator, HealthCheckService } from '@nestjs/terminus';
import { InjectConnection } from '@nestjs/mongoose';

import * as os from 'os';
import { Connection } from 'mongoose';

import { DATABASES } from '@common/constants';
import { getPkgVersion } from '@common/utils';

@Injectable()
export class HealthzService {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly mongooseHealthIndicator: MongooseHealthIndicator,
    @InjectConnection(DATABASES.MONGO)
    private mongoConnection: Connection,
  ) {}

  public async check() {
    const services = await this.healthCheckService.check([
      async () =>
        await this.mongooseHealthIndicator.pingCheck(DATABASES.MONGO, {
          connection: this.mongoConnection,
        }),
    ]);
    return {
      hostname: os.hostname(),
      version: getPkgVersion() || 'unknown',
      uptime: process.uptime() + ' seconds',
      ...services,
    };
  }
}
