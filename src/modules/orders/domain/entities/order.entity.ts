import { Product } from '@modules/products/domain/entities';

export class Order {
  clientName: string;
  total: string;
  productList: Product[] | string[] = [];

  constructor(partial: Partial<Order>) {
    this.clientName = partial.clientName ?? '';
    this.total = partial.total ?? '';
    this.productList = partial.productList ?? [];
  }
}
