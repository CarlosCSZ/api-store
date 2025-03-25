import { Order } from '@modules/orders/domain/entities';
import { OrderRepository } from '@modules/orders/domain/repositories';

export class FindOrderByIdUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(id: string): Promise<Order> {
    return this.orderRepository.findById(id);
  }
}
