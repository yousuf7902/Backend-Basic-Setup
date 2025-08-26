import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from 'src/utils/logger.util';


@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception instanceof HttpException ? exception.getStatus() : 500;
    const message = exception instanceof HttpException ? exception.getResponse() : 'Internal server error';

    response.status(status).json({
      statusCode: status, 
      message,
      path: request.url,
    });

    this.logger.error(
      `${request.method} ${request.url}`,
      JSON.stringify({ statusCode: status, message, path: request.url }),
    );
  }
}
