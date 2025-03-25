import { Order } from '@domain/entities';
import { OrderRepository } from '@domain/repositories';

export class FindWithHigherTotalUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(): Promise<Order> {
    return this.orderRepository.findSorted({}, { total: -1 }, 1)[0];
  }
}
