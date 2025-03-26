import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { IAppConfig } from '@shared/config/app.config';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { ITokenPayload } from '../interfaces/token-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'api-key') {
  constructor(protected readonly configService: ConfigService<IAppConfig>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('secret') as string,
    });
  }

  validate(payload: ITokenPayload): { apiKey: string } {
    return { apiKey: payload.apiKey };
  }
}
