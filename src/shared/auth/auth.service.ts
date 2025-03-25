import { UnauthorizedException } from '@common/exceptions/api.exception';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AppConfig } from '@shared/config/app.config';

@Injectable()
export class AuthService {
  private readonly secret: string;

  constructor(
    private readonly configService: ConfigService<AppConfig>,
    private readonly jwtService: JwtService,
  ) {
    this.secret = this.configService.get<string>('secret') as string;
  }

  validateApiKey(apiKey: string): boolean {
    return apiKey === this.secret;
  }

  login(apiKey: string): { access_token: string } {
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
