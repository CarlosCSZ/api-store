import { Injectable } from '@nestjs/common';

import { CreateProductUseCase, FindProductBySkuUseCase } from '../useCases';
import { Product } from '../../domain/entities';
import { CreateProductDto } from '../../infrastructure/dtos/product.dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly findProductUseCase: FindProductBySkuUseCase,
  ) {}

  async findById(id: string): Promise<Product> {
    return await this.findProductUseCase.execute(id);
  }

  async create(data: CreateProductDto): Promise<Product> {
    return await this.createProductUseCase.execute(new Product(data));
  }
}
