import { OrderService } from '@application/services/order.service';
import { CreateOrderDto } from '@infrastructure/dtos/order.dto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() data: CreateOrderDto) {
    console.log(data);
    return this.orderService.create(data);
  }
}
