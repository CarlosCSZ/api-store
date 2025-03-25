import { IsString } from 'class-validator';

export class AuthDto {
  @IsString()
  apiKey: string;
}
