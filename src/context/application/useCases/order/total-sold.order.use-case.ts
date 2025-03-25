import { OrderRepository } from '@domain/repositories';

export class TotalSoldLastMonthUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(start: Date, end: Date): Promise<string> {
    const orders = await this.orderRepository.findWithFilters([
      {
        $match: {
          createdAt: { $gte: start, $lte: end },
        },
      },
    ]);
    let sum = 0;
    for (const order of orders) {
      sum += Number(order.total);
    }

    return `$${sum.toFixed(2)}`;
  }
}
