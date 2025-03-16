import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from 'src/utils/logger.util';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(private readonly logger: LoggerService){}

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const message = exception.getResponse();
      
        response
          .status(status)
          .json({
            statusCode: status,
            message: message,
            path: request.url,
          });
        
          this.logger.error(
            `${request.method} ${request.url}`,
            JSON.stringify({
                statusCode: status,
                message: message,
                path: request.url,
              }),
            'ExceptionFilter',
          );
      }
}