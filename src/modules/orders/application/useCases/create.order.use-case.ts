import { Order } from '@modules/orders/domain/entities';
import { OrderRepository } from '@modules/orders/domain/repositories';

export class CreateOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(order: Order): Promise<Order> {
    return this.orderRepository.create(order);
  }
}
