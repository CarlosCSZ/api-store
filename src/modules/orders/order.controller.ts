import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

import { OrderService } from './application/services/order.service';
import {
  CreateOrderDto,
  OrderResponseDto,
  TotalAmountDto,
  UpdateOrderDto,
} from './infrastructure/dtos/order.dto';
import { ApiKeyGuard } from '@shared/auth/guards/api-key.guard';

@Controller('orders')
@UseGuards(ApiKeyGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Retrieve the total amount sold in the last month' })
  @ApiResponse({ status: HttpStatus.OK, type: TotalAmountDto })
  @Get('/sold-last-month')
  findTotalSoldLastMonth() {
    return this.orderService.findTotalSoldLastMonth();
  }

  @ApiOperation({ summary: 'Retrieve the order with the highest amount' })
  @ApiResponse({ status: HttpStatus.OK, type: OrderResponseDto })
  @Get('/higher-amount')
  findWithHigherTotal() {
    return this.orderService.findWithHigherTotal();
  }

  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: HttpStatus.CREATED, type: OrderResponseDto })
  @Post()
  create(@Body() data: CreateOrderDto) {
    return this.orderService.create(data);
  }

  @ApiOperation({ summary: 'Update an existing order' })
  @ApiResponse({ status: HttpStatus.CREATED, type: OrderResponseDto })
  @ApiParam({ name: 'id', type: String })
  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateOrderDto) {
    return this.orderService.update(id, data);
  }
}
