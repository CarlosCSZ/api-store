import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    let errorRes = exception.getResponse();
    if (typeof errorRes === 'object' && typeof errorRes['error'] !== 'object') {
      errorRes = {
        error: errorRes,
      };
    }

    // in current version Logger's methods accept context as the last argument.
    response.status(status).json(errorRes);
  }
}
