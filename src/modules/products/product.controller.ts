import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ProductService } from './application/services/product.service';
import {
  CreateProductDto,
  ProductResponse,
} from './infrastructure/dtos/product.dto';
import { ApiKeyGuard } from '@shared/auth/guards/api-key.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@ApiTags('Products')
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
  @UseInterceptors(FileInterceptor('picture', { storage: memoryStorage() }))
  @Post()
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: CreateProductDto,
  ) {
    return await this.productService.create(file, data);
  }
}
