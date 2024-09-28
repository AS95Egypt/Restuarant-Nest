import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './utils/exception-filters/exception-filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // base route
  app.setGlobalPrefix('api/v1');

  // Validation
  app.useGlobalPipes(new ValidationPipe());

  // Global Exception Filter
  app.useGlobalFilters(new AllExceptionsFilter());

  // CORS
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
