import { Product } from '../entities';

export abstract class ProductRepository {
  abstract findById(id: string): Promise<Product>;
  abstract findBySku(sku: string): Promise<Product>;
  abstract create(product: Product): Promise<Product>;
}
