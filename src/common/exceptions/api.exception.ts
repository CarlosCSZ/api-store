import { HttpException, HttpStatus } from '@nestjs/common';

export class ApiException extends HttpException {
  code: string;

  constructor(
    message: string,
    code: string,
    status: HttpStatus,
    name?: string,
  ) {
    super({ message, code, statusCode: status }, status);
    this.code = code;
    this.name = name || 'APIError';
  }

  public getResponse(): string | object {
    return {
      error: {
        statusCode: this.getStatus(),
        name: this.name,
        message: this.message,
        code: this.code,
      },
    };
  }
}

export class UnauthorizedException extends ApiException {
  constructor() {
    super(
      'Authorization Required',
      'AUTHORIZATION_REQUIRED',
      HttpStatus.UNAUTHORIZED,
      'Error',
    );
  }
}
export class ForbiddenException extends ApiException {
  constructor(message?: string) {
    super(message ?? 'Forbidden Request', 'FORBIDDEN', HttpStatus.FORBIDDEN);
  }
}

export class NotFoundException extends ApiException {
  constructor(message?: string) {
    super(message ? message : 'Not Found', 'NOT_FOUND', HttpStatus.NOT_FOUND);
  }
}

export class InternalServerErrorException extends ApiException {
  constructor(message: string) {
    super(message, 'INTERNAL_SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class BadRequestException extends ApiException {
  constructor(message: string) {
    super(
      message ? message : 'Invalid Format',
      'BAD_REQUEST',
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class UnprocessableException extends ApiException {
  constructor(message: string) {
    super(
      message ?? 'Unprocessable Entity',
      'Unprocessable_Entity',
      HttpStatus.UNPROCESSABLE_ENTITY,
      'Unprocessable Entity',
    );
  }
}
