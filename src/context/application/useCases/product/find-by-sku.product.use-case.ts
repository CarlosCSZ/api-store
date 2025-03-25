import { Product } from '@domain/entities';
import { ProductRepository } from '@domain/repositories';

export class FindProductBySkuUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: string): Promise<Product> {
    return await this.productRepository.findBySku(id);
  }
}
