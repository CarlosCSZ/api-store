import { ProductsModule } from './modules/products/products.module';
import { Module } from '@nestjs/common';

import { AppConfigModule } from '@shared/config/config.module';
import { AuthModule } from './shared/auth/auth.module';
import { OrdersModule } from '@modules/orders/orders.module';

@Module({
  imports: [ProductsModule, OrdersModule, AppConfigModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
