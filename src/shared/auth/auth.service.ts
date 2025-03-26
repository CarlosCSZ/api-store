import { UnauthorizedException } from '@common/exceptions/api.exception';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IAppConfig } from '@shared/config/app.config';
import { TokenResponse } from './dtos/auth.dto';

@Injectable()
export class AuthService {
  private readonly secret: string;

  constructor(
    private readonly configService: ConfigService<IAppConfig>,
    private readonly jwtService: JwtService,
  ) {
    this.secret = this.configService.get<string>('secret') as string;
  }

  validateApiKey(apiKey: string): boolean {
    return apiKey === this.secret;
  }

  login(apiKey: string): TokenResponse {
    if (!this.validateApiKey(apiKey)) {
      throw new UnauthorizedException();
    }

    const payload = { apiKey };
    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: '1h',
        secret: this.secret,
        subject: 'admin',
      }),
    };
  }
}
