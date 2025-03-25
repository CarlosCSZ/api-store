import { IsOptional, IsString, Matches } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsOptional()
  sku?: string;

  @IsString()
  name: string;

  @IsString()
  picture: string;

  @IsString()
  @Matches(/^\d+(\.\d{1,2})?$/, { message: 'Price must be a valid number' })
  price: string;
}
