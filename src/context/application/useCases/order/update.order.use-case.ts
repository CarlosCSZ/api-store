import { Order } from '@domain/entities';
import { OrderRepository } from '@domain/repositories';

export class UpdateOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(id: string, order: Partial<Order>): Promise<Order> {
    return this.orderRepository.update(id, order);
  }
}
