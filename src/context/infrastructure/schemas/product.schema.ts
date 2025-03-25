import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Product } from '@domain/entities';

@Schema()
export class ProductMongoSchema implements Product {
  @Prop({ required: true, unique: true })
  sku: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  picture: string;

  @Prop({ required: true })
  price: string;
}

export const ProductSchema = SchemaFactory.createForClass(ProductMongoSchema);
