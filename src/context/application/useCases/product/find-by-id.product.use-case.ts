import { Product } from '@domain/entities';
import { ProductRepository } from '@domain/repositories';

export class FindProductByIdUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: string): Promise<Product> {
    return await this.productRepository.findById(id);
  }
}
