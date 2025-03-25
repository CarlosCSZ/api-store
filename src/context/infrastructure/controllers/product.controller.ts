import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { ProductService } from '@application/services/product.service';
import { CreateProductDto } from '@infrastructure/dtos/product.dto';
import { ApiKeyGuard } from '@shared/auth/guards/api-key.guard';

@Controller('products')
@UseGuards(ApiKeyGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.productService.findById(id);
  }

  @Post()
  async create(@Body() data: CreateProductDto) {
    return await this.productService.create(data);
  }
}
