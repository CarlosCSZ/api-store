import { Injectable } from '@nestjs/common';

import { CreateProductUseCase, FindProductBySkuUseCase } from '../useCases';
import { Product } from '../../domain/entities';
import { CreateProductDto } from '../../infrastructure/dtos/product.dto';
import { BucketStorage } from '../../domain/storage/bucket.storage';

@Injectable()
export class ProductService {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly findProductUseCase: FindProductBySkuUseCase,
    private readonly bucketService: BucketStorage,
  ) {}

  async findById(id: string): Promise<Product> {
    const product = await this.findProductUseCase.execute(id);
    const url = this.bucketService.signUrl(product.picture);
    product.picture = url;

    return product;
  }

  async create(
    file: Express.Multer.File,
    data: CreateProductDto,
  ): Promise<Product> {
    const bucketResp = await this.bucketService.uploadFile(file);
    data.picture = bucketResp.key;
    const product = await this.createProductUseCase.execute(new Product(data));
    product.picture = bucketResp.url;

    return product;
  }
}
