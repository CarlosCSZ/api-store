import { Order } from '@modules/orders/domain/entities';
import { OrderRepository } from '@modules/orders/domain/repositories';

export class FindWithHigherTotalUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(): Promise<Order> {
    return (await this.orderRepository.findSorted({}, 'total', 1))[0];
  }
}
