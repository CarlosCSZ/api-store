import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthDto {
  @IsString()
  @ApiProperty({
    type: String,
    description: 'API key',
  })
  apiKey: string;
}

export class TokenResponse {
  @ApiProperty({
    type: String,
    description: 'Access token',
  })
  access_token: string;
}
