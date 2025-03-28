import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { NotFoundException } from '@common/exceptions/api.exception';
import { DATABASES } from '@common/constants/databases.enum';
import { Product } from '../../domain/entities';
import { ProductRepository } from '../../domain/repositories';
import { ProductMongoSchema } from '../schemas';

@Injectable()
export class ProductMongoRepository implements ProductRepository {
  constructor(
    @InjectModel(Product.name, DATABASES.MONGO)
    private readonly productModel: Model<ProductMongoSchema>,
  ) {}

  async findById(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product.toJSON();
  }

  async findBySku(sku: string): Promise<Product> {
    const product = await this.productModel.findOne({ sku }).exec();
    if (!product) {
      throw new NotFoundException(`Product with sku ${sku} not found`);
    }

    return product.toJSON();
  }

  async create(product: Product): Promise<Product> {
    return this.productModel.create(product);
  }
}
