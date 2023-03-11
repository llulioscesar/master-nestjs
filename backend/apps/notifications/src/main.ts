import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notifications.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AllExceptionsFilter } from '../../../shared';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    NotificationsModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'notifications',
        protoPath: '/usr/src/app/proto/notifications/notifications.proto',
        url: '0.0.0.0:5000',
      },
    },
  );

  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen();
}
bootstrap();
