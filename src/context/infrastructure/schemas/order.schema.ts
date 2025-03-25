import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose from 'mongoose';

import { Product, Order } from '@domain/entities';
import { ProductMongoSchema } from './product.schema';

@Schema()
export class OrderMongoSchema implements Order {
  @Prop({ required: true })
  clientName: string;

  @Prop({ required: true })
  total: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Product.name }] })
  productList: ProductMongoSchema[];
}

export const OrderSchema = SchemaFactory.createForClass(OrderMongoSchema);
