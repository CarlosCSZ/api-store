import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';

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
import { BucketStorage } from './domain/storage/bucket.storage';
import { S3Service } from './infrastructure/services/s3.service';
import { fileFilterImages } from '@common/utils';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Product.name, schema: ProductSchema }],
      DATABASES.MONGO,
    ),
    MulterModule.register({
      limits: {
        fileSize: 1024 * 1024 * 5,
      },
      fileFilter: fileFilterImages,
    }),
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
    {
      provide: BucketStorage,
      useClass: S3Service,
    },
  ],
  exports: [ProductService, findProductByIdProvider, BucketStorage],
})
export class ProductsModule {}
