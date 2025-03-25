import { Order } from '@domain/entities';
import { OrderRepository } from '@domain/repositories';

export class FindOrderByIdUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(id: string): Promise<Order> {
    return this.orderRepository.findById(id);
  }
}
