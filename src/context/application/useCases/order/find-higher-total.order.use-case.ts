import { Order } from '@domain/entities';
import { OrderRepository } from '@domain/repositories';

export class FindWithHigherTotalUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(): Promise<Order> {
    return (await this.orderRepository.findSorted({}, 'total', 1))[0];
  }
}
