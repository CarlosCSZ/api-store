import { v4 as uuidv4 } from 'uuid';

export class Product {
  sku: string;
  name: string;
  picture: string;
  price: string;
  constructor(partial: Partial<Product>) {
    this.sku = partial.sku ?? uuidv4();
    this.name = partial.name ?? '';
    this.picture = partial.picture ?? '';
    this.price = partial.price ?? '0.00';
  }
}
