import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './Utils/logger.util';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './Common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new LoggerService();

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter(logger));
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
  logger.log(`Application is running on: ${await app.getUrl()}`);
  
}
bootstrap();
