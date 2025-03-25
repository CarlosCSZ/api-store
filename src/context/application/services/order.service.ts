import { Injectable } from '@nestjs/common';

import {
  CreateOrderUseCase,
  FindWithHigherTotalUseCase,
  TotalSoldLastMonthUseCase,
  UpdateOrderUseCase,
} from '@application/useCases/order';
import { Order } from '@domain/entities';
import { CreateOrderDto } from '@infrastructure/dtos/order.dto';
import { FindProductUseCase } from '@application/useCases/product';

@Injectable()
export class OrderService {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly updateOrderUseCase: UpdateOrderUseCase,
    private readonly totalSoldLastMonthUseCase: TotalSoldLastMonthUseCase,
    private readonly findWithHigherTotalUseCase: FindWithHigherTotalUseCase,
    private readonly findProductUseCase: FindProductUseCase,
  ) {}

  async create(order: CreateOrderDto): Promise<Order> {
    let total = 0;
    for (const sku of order.productList) {
      const product = await this.findProductUseCase.execute(sku);
      total += Number(product.price);
    }

    return this.createOrderUseCase.execute(
      new Order({
        clientName: order.clientName,
        productList: order.productList,
        total: total.toFixed(2),
      }),
    );
  }

  async update(id: string, order: Partial<Order>): Promise<Order> {
    return this.updateOrderUseCase.execute(id, order);
  }

  async findTotalSoldLastMonth(): Promise<string> {
    const start = new Date();
    start.setMonth(start.getMonth() - 1);
    return this.totalSoldLastMonthUseCase.execute(start, new Date());
  }

  async findWithHigherTotal(): Promise<Order> {
    return this.findWithHigherTotalUseCase.execute();
  }
}
