import { OrderRepository } from '@modules/orders/domain/repositories';

export class TotalSoldLastMonthUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(start: Date, end: Date): Promise<string> {
    const orders = await this.orderRepository.findWithinRange(start, end);
    let sum = 0;
    for (const order of orders) {
      sum += Number(order.total);
    }

    return `$${sum.toFixed(2)}`;
  }
}
