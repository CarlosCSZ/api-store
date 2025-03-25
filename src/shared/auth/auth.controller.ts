import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { AuthService } from '@shared/auth/auth.service';
import { AuthDto, TokenResponse } from './dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Generate token' })
  @ApiResponse({ status: HttpStatus.CREATED, type: TokenResponse })
  @Post()
  generateToken(@Body() authDto: AuthDto) {
    return this.authService.login(authDto.apiKey);
  }
}
