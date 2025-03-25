import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose from 'mongoose';

import { Order } from '@modules/orders/domain/entities';
import { Product } from '@modules/products/domain/entities';
import { ProductMongoSchema } from '@modules/products/infrastructure/schemas';

@Schema({ timestamps: true })
export class OrderMongoSchema implements Order {
  @Prop({ required: true })
  clientName: string;

  @Prop({ required: true })
  total: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Product.name }] })
  productList: ProductMongoSchema[];
}

export const OrderSchema = SchemaFactory.createForClass(OrderMongoSchema);
