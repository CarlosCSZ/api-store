import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class CreateOrderDto {
  @IsString()
  @ApiProperty({ type: String, description: 'Client name' })
  clientName: string;

  @IsArray()
  @IsString({ each: true })
  @ApiProperty({ type: [String], description: 'Product list' })
  productList: string[];
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}

export class OrderResponseDto extends CreateOrderDto {
  @ApiProperty({
    type: mongoose.Schema.Types.ObjectId,
    description: 'Order ID',
  })
  _id: string;

  @ApiProperty({ type: String, description: 'Total order amount' })
  total: string;
}

export class TotalAmountDto {
  @IsString()
  @ApiProperty({ type: String, description: 'Total amount' })
  total: string;
}
