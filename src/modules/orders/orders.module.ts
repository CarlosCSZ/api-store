import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OrderController } from './order.controller';
import { OrderService } from './application/services/order.service';
import {
  createOrderProvider,
  findOrderByIdProvider,
  findTotalSoldLastMonthProvider,
  findWithHigherTotalProvider,
  updateOrderProvider,
} from './application/order-providers.factory';
import { OrderRepository } from './domain/repositories';
import { OrderMongoRepository } from './infrastructure/repositories/order.mongo.repository';
import { OrderSchema } from './infrastructure/schemas';
import { Order } from './domain/entities';
import { DATABASES } from '@common/constants';
import { ProductsModule } from '@modules/products/products.module';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forFeature(
      [{ name: Order.name, schema: OrderSchema }],
      DATABASES.MONGO,
    ),
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    createOrderProvider,
    updateOrderProvider,
    findWithHigherTotalProvider,
    findTotalSoldLastMonthProvider,
    findOrderByIdProvider,
    {
      provide: OrderRepository,
      useClass: OrderMongoRepository,
    },
  ],
})
export class OrdersModule {}
