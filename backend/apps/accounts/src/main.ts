import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AccountsModule } from './accounts.module';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Logger } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateProfileCommand } from './application/commands/create-profile.command';
import helmet from 'helmet';
import { AllExceptionsFilter } from '../../../libs/utils/src';

async function bootstrap() {
  const logger = new Logger(AccountsModule.name);

  const app = await NestFactory.create(AccountsModule);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter as any));
  app.enableCors();
  app.use(helmet());

  const config = new DocumentBuilder()
    .setTitle('Microservice Accounts')
    .setDescription('The accounts microservice description')
    .setVersion('1.0')
    .addTag('accounts')
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

  await app.listen(3000);
}
bootstrap();
