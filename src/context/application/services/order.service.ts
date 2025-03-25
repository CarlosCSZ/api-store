import { Injectable } from '@nestjs/common';

import {
  CreateOrderUseCase,
  FindWithHigherTotalUseCase,
  TotalSoldLastMonthUseCase,
  UpdateOrderUseCase,
} from '@application/useCases/order';
import { Order } from '@domain/entities';
import { CreateOrderDto, UpdateOrderDto } from '@infrastructure/dtos/order.dto';
import { FindProductByIdUseCase } from '@application/useCases/product';
import { FindOrderByIdUseCase } from '@application/useCases/order/find-by-id.order.use-case';

@Injectable()
export class OrderService {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly updateOrderUseCase: UpdateOrderUseCase,
    private readonly totalSoldLastMonthUseCase: TotalSoldLastMonthUseCase,
    private readonly findWithHigherTotalUseCase: FindWithHigherTotalUseCase,
    private readonly findOrderByIdUseCase: FindOrderByIdUseCase,
    private readonly findProductUseCase: FindProductByIdUseCase,
  ) {}

  async create(order: CreateOrderDto): Promise<Order> {
    let total = 0;
    for (const id of order.productList) {
      const product = await this.findProductUseCase.execute(id);
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

  async update(id: string, order: UpdateOrderDto): Promise<Order> {
    const orderToUpdate = await this.findOrderByIdUseCase.execute(id);
    let total = 0;
    orderToUpdate.clientName = order.clientName ?? orderToUpdate.clientName;
    if (order.productList) {
      for (const id of order.productList) {
        const product = await this.findProductUseCase.execute(id);
        total += Number(product.price);
      }
      orderToUpdate.total = total.toFixed(2);
      orderToUpdate.productList = order.productList;
    }

    return this.updateOrderUseCase.execute(id, orderToUpdate);
  }

  async findTotalSoldLastMonth(): Promise<{ total: string }> {
    const start = new Date();
    start.setMonth(start.getMonth() - 1);
    const total = await this.totalSoldLastMonthUseCase.execute(
      start,
      new Date(),
    );
    return { total };
  }

  async findWithHigherTotal(): Promise<Order> {
    return this.findWithHigherTotalUseCase.execute();
  }
}
