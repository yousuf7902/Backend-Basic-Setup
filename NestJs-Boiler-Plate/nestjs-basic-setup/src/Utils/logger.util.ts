import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
  log(message: string, context?: string) {
    console.log(`[${context || 'NestApplication'}] ${message}`);
  }

  error(message: string, trace: string, context?: string) {
    console.error(`[${context || 'NestApplication'}] ERROR: ${message}`, trace);
  }

  warn(message: string, context?: string) {
    console.warn(`[${context || 'NestApplication'}] WARN: ${message}`);
  }
}