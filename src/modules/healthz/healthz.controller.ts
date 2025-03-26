import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { HealthzService } from './healthz.service';
import { HealthCheck } from '@nestjs/terminus';

@ApiTags('Healthz')
@Controller()
export class HealthzController {
  constructor(private readonly healthzService: HealthzService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Health check',
    type: Object,
  })
  @ApiOperation({
    summary: 'Health check',
  })
  @Get('/healthz')
  @HealthCheck()
  check() {
    return this.healthzService.check();
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Health check',
    type: Object,
  })
  @ApiOperation({
    summary: 'Health check',
  })
  @Get('/liveness')
  @HealthCheck()
  liveness() {
    return;
  }
}
