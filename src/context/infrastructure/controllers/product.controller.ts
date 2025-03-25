import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { ProductService } from '@application/services/product.service';
import {
  CreateProductDto,
  ProductResponse,
} from '@infrastructure/dtos/product.dto';
import { ApiKeyGuard } from '@shared/auth/guards/api-key.guard';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('products')
@UseGuards(ApiKeyGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: 'Retrieve a product by its ID' })
  @ApiResponse({ status: HttpStatus.OK, type: ProductResponse })
  @ApiParam({ name: 'id', type: String })
  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.productService.findById(id);
  }

  @ApiOperation({ summary: 'Create a product' })
  @ApiResponse({ status: HttpStatus.CREATED, type: ProductResponse })
  @Post()
  async create(@Body() data: CreateProductDto) {
    return await this.productService.create(data);
  }
}
