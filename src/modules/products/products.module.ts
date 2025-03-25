import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductController } from './product.controller';
import { ProductService } from './application/services/product.service';
import {
  createProductProvider,
  findProductByIdProvider,
  findProductBySkuProvider,
} from './application/product-providers.factory';
import { ProductRepository } from './domain/repositories';
import { ProductMongoRepository } from './infrastructure/repositories/product.mongo.repository';
import { Product } from './domain/entities';
import { ProductSchema } from './infrastructure/schemas';
import { DATABASES } from '@common/constants';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Product.name, schema: ProductSchema }],
      DATABASES.MONGO,
    ),
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    createProductProvider,
    findProductByIdProvider,
    findProductBySkuProvider,
    {
      provide: ProductRepository,
      useClass: ProductMongoRepository,
    },
  ],
  exports: [ProductService, findProductByIdProvider],
})
export class ProductsModule {}
