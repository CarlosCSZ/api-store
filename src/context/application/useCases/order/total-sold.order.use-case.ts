import { OrderRepository } from '@domain/repositories';

export class TotalSoldLastMonthUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(start: Date, end: Date): Promise<string> {
    const orders = await this.orderRepository.findWithFilters([
      {
        $match: {
          createdAt: { $gte: start, $lt: end },
        },
      },
      {
        $lookup: {
          from: 'products',
          localField: 'productList',
          foreignField: 'sku',
          as: 'productList',
        },
      },
      { $unwind: '$products' },
    ]);
    let sum = 0;
    for (const order of orders) {
      sum += Number(order.total);
    }

    return `$ ${sum.toPrecision(2)}`;
  }
}
