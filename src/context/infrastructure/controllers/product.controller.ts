import { ProductService } from '@application/services/product.service';
import { CreateProductDto } from '@infrastructure/dtos/product.dto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() data: CreateProductDto) {
    console.log(data);
    return await this.productService.create(data);
  }
}
