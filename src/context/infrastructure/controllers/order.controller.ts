import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { OrderService } from '@application/services/order.service';
import { CreateOrderDto, UpdateOrderDto } from '@infrastructure/dtos/order.dto';
import { ApiKeyGuard } from '@shared/auth/guards/api-key.guard';

@Controller('orders')
@UseGuards(ApiKeyGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('/sold-last-month')
  findTotalSoldLastMonth() {
    return this.orderService.findTotalSoldLastMonth();
  }

  @Get('/higher-amount')
  findWithHigherTotal() {
    return this.orderService.findWithHigherTotal();
  }

  @Post()
  create(@Body() data: CreateOrderDto) {
    return this.orderService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateOrderDto) {
    return this.orderService.update(id, data);
  }
}
