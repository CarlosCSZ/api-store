import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Product, Order } from '@domain/entities';
import { ProductSchema, OrderSchema } from './schemas';
import { OrderMongoRepository } from './repositories/order.mongo.repository';
import { ProductMongoRepository } from './repositories/product.mongo.repository';
import { OrderController } from './controllers/order.controller';
import { ProductController } from './controllers/product.controller';
import { ProductService } from '@application/services/product.service';
import { OrderService } from '@application/services/order.service';
import {
  createProductProvider,
  findProductProvider,
} from '@application/product-providers.factory';
import {
  createOrderProvider,
  findTotalSoldLastMonthProvider,
  findWithHigherTotalProvider,
  updateOrderProvider,
} from '@application/order-providers.factory';
import { OrderRepository, ProductRepository } from '@domain/repositories';
import { DATABASES } from '@common/constants/databases.enum';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Product.name, schema: ProductSchema },
        { name: Order.name, schema: OrderSchema },
      ],
      DATABASES.MONGO,
    ),
  ],
  controllers: [OrderController, ProductController],
  providers: [
    ProductService,
    OrderService,
    createProductProvider,
    findProductProvider,
    createOrderProvider,
    updateOrderProvider,
    findWithHigherTotalProvider,
    findTotalSoldLastMonthProvider,
    {
      provide: ProductRepository,
      useClass: ProductMongoRepository,
    },
    {
      provide: OrderRepository,
      useClass: OrderMongoRepository,
    },
  ],
})
export class AppInfrastructureModule {}
