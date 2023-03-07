import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PublicationsController } from './application/controllers';
import { PublicationsService } from './application/services';
import { DatabaseModule } from './infrastructure/database';
import {
  CreatePublicationCommand,
  CreatePublicationHandler,
  DeletePublicationCommand,
  DeletePublicationHandler,
} from './application/commands';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CqrsModule } from '@nestjs/cqrs';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UpdatePublicationCommand } from './application/commands';
import {
  GetPublicationsHandler,
  GetPublicationsQuery,
} from './application/queries';
import { JwtStrategy, LoggerMiddleware } from '../../../shared';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN,
        algorithm: `${process.env.JWT_ALGORITHM}` as any,
      },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    DatabaseModule,
    CqrsModule,
    EventEmitterModule.forRoot(),
  ],
  controllers: [PublicationsController],
  providers: [
    PublicationsService,
    CreatePublicationCommand,
    CreatePublicationHandler,
    UpdatePublicationCommand,
    UpdatePublicationCommand,
    DeletePublicationCommand,
    DeletePublicationHandler,
    GetPublicationsQuery,
    GetPublicationsHandler,
    JwtStrategy,
  ],
})
export class PublicationsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
