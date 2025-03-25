import { Order } from '../entities';

export abstract class OrderRepository {
  abstract findWithFilters(query: any): Promise<Order[]>;
  abstract findSorted(
    query: Record<string, any>,
    sort: Record<string, any> | string,
    limit: number,
  ): Promise<Order[]>;
  abstract findById(id: string): Promise<Order>;
  abstract create(order: Order): Promise<Order>;
  abstract update(id: string, order: Partial<Order>): Promise<Order>;
}
