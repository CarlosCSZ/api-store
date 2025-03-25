import { Product } from '@modules/products/domain/entities';
import { ProductRepository } from '@modules/products//domain/repositories';

export class FindProductByIdUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: string): Promise<Product> {
    return await this.productRepository.findById(id);
  }
}
