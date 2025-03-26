import { Module } from '@nestjs/common';

import { AppConfigModule } from '@shared/config/config.module';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
import { AuthModule } from './shared/auth/auth.module';
import { HealthzModule } from './modules/healthz/healthz.module';

@Module({
  imports: [
    ProductsModule,
    OrdersModule,
    AppConfigModule,
    AuthModule,
    HealthzModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
