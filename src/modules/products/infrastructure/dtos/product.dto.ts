import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Matches } from 'class-validator';
import mongoose from 'mongoose';

export class CreateProductDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: 'Product SKU' })
  sku?: string;

  @IsString()
  @ApiProperty({ type: String, description: 'Product name' })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: 'Product picture' })
  picture: string;

  @IsString()
  @Matches(/^\d+(\.\d{1,2})?$/, { message: 'Price must be a valid number' })
  @ApiProperty({ type: String, description: 'Product price' })
  price: string;
}

export class ProductResponse extends CreateProductDto {
  @ApiProperty({
    type: mongoose.Schema.Types.ObjectId,
    description: 'Product ID',
  })
  _id: string;
}
