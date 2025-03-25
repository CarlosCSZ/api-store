import { Product } from '@modules/products/domain/entities';
import { ProductRepository } from '@modules/products//domain/repositories';

export class CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(data: Product): Promise<Product> {
    return await this.productRepository.create(data);
  }
}
