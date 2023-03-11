import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AccountsModule } from './accounts.module';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Logger } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateProfileCommand } from './application/commands';
import helmet from 'helmet';
import { AllExceptionsFilter } from '../../../shared';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const logger = new Logger(AccountsModule.name);

  const app = await NestFactory.create(AccountsModule);

  app.useGlobalFilters(new AllExceptionsFilter());
  app.enableCors();
  app.use(helmet());

  const config = new DocumentBuilder()
    .setTitle('Microservice Accounts')
    .setDescription('The accounts microservice description')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Accounts')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  const eventEmitter = app.get(EventEmitter2);
  eventEmitter.on('user.created', (user) => {
    logger.log('User created event received');
    const commandBus = app.get(CommandBus);
    const command = new CreateProfileCommand(user.profile);
    commandBus.execute(command);
  });

  const microservice = app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: 'accounts',
      protoPath: [`/usr/src/app/proto/accounts/accounts.proto`],
      url: '0.0.0.0:5000',
    },
  });

  microservice.useGlobalFilters(new AllExceptionsFilter());

  await app.startAllMicroservices();

  await app.listen(3000);
}
bootstrap();
