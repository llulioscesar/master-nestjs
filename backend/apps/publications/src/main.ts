import { NestFactory } from '@nestjs/core';
import { PublicationsModule } from './publications.module';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from '../../../shared';

async function bootstrap() {
  const app = await NestFactory.create(PublicationsModule);

  app.useGlobalFilters(new AllExceptionsFilter());
  app.enableCors();
  app.use(helmet());

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Microservice Publications')
    .setDescription('The publications microservice description')
    .setVersion('1.0')
    .addTag('Publications')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();
