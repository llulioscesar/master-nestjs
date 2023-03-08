import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private logger: Logger;
  constructor() {
    this.logger = new Logger(AllExceptionsFilter.name);
  }

  catch(exception: unknown, host: ArgumentsHost): void {
    const hostType = host.getType();

    this.logger.error(`Host type: ${hostType}`, exception);

    if (hostType === 'http') {
      const ctx = host.switchToHttp();
      const response: Response = ctx.getResponse();

      const httpStatus =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;

      const responseBody = {
        statusCode: httpStatus,
        timestamp: new Date().toISOString(),
        message: (exception as Error).message,
      };

      response.status(httpStatus).json(responseBody);
    }
  }
}
