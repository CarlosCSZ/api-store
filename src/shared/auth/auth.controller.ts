import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '@shared/auth/auth.service';
import { AuthDto } from './dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  generateToken(@Body() authDto: AuthDto) {
    return this.authService.login(authDto.apiKey);
  }
}
