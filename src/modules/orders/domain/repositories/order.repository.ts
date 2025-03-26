import { Order } from '../entities';

export abstract class OrderRepository {
  abstract findWithinRange(start: Date, end: Date): Promise<Order[]>;
  abstract findSorted(
    query: Partial<Order>,
    sortedField?: keyof Order,
    limit?: number,
  ): Promise<Order[]>;
  abstract findById(id: string): Promise<Order>;
  abstract create(order: Order): Promise<Order>;
  abstract update(id: string, order: Partial<Order>): Promise<Order>;
}
