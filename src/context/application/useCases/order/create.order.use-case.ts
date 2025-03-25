import { Order } from '@domain/entities';
import { OrderRepository } from '@domain/repositories';

export class CreateOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(order: Order): Promise<Order> {
    return this.orderRepository.create(order);
  }
}
