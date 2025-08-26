import { Injectable, LoggerService as NestLogger } from '@nestjs/common';
import { createLogger, transports, format, Logger } from 'winston';

@Injectable()
export class LoggerService implements NestLogger {
  private readonly logger: Logger;

  constructor() {
    this.logger = createLogger({
      level: 'info',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`),
      ),
      transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.File({ filename: 'logs/app.log' }),
      ],
    });
  }

  log(message: string) {
    this.logger.info(message);
  }
  error(message: string, trace?: string) {
    this.logger.error(message, { trace });
  }
  warn(message: string) {
    this.logger.warn(message);
  }
}
