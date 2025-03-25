import { Product } from '@domain/entities';

export abstract class ProductRepository {
  abstract findById(id: string): Promise<Product>;
  abstract create(product: Product): Promise<Product>;
}
