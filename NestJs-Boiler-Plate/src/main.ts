import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggerService } from './utils/logger.util';
import * as bodyParser from 'body-parser';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './config/swagger.config';
import { AllExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new LoggerService();
  app.useLogger(logger);
  app.setGlobalPrefix(process.env.API_GLOBAL_PREFIX as string);
  
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionFilter(logger));
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });

  SwaggerModule.setup('api-docs', app, SwaggerModule.createDocument(app, swaggerConfig), {
    swaggerOptions: {
      persistAuthorization: true,
      filter: true,
      showRequestDuration: true,
      docExpansion: "none", // This makes all sections collapsed by default
    },
  });

  await app.listen(process.env.SERVER_PORT ?? 3000);
  logger.log(`Application is running on: ${await app.getUrl()}`);
  
}
bootstrap();
