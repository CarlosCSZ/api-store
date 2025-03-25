import { PartialType } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  clientName: string;

  @IsArray()
  @IsString({ each: true })
  productList: string[];
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
