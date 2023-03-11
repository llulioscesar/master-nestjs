import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import {
  CommentsController,
  PublicationsController,
  PublicationsControllerGrpc,
} from './application/controllers';
import {
  CommentsService,
  CommentsServiceGrpc,
  NotificationsService,
  PublicationServiceGrpc,
  PublicationsService,
} from './application/services';
import { DatabaseModule } from './infrastructure/database';
import {
  CreatePublicationCommand,
  CreatePublicationHandler,
  DeletePublicationCommand,
  DeletePublicationHandler,
  UpdatePublicationHandler,
} from './application/commands';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CqrsModule } from '@nestjs/cqrs';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UpdatePublicationCommand } from './application/commands';
import {
  CountCommentsPublicationsHandler,
  CountCommentsPublicationsQuery,
  GetCommentsHandler,
  GetCommentsQuery,
  GetPublicationQuery,
  GetPublicationQueryHandler,
  GetPublicationsHandler,
  GetPublicationsQuery,
} from './application/queries';
import { JwtStrategy, LoggerMiddleware } from '../../../shared';
import {
  CreateCommentCommand,
  CreateCommentHandler,
  DeleteCommentCommand,
  DeleteCommentHandler,
} from './application/commands';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NOTIFICATIONS_SERVICE',
        transport: Transport.GRPC,
        options: {
          url: `${process.env.GRPC_NOTIFICATIONS}`,
          package: 'notifications',
          protoPath: ['/usr/src/app/proto/notifications/notifications.proto'],
        },
      },
    ]),
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
  controllers: [
    PublicationsController,
    CommentsController,
    PublicationsControllerGrpc,
  ],
  providers: [
    PublicationsService,
    CommentsService,
    CreatePublicationCommand,
    CreatePublicationHandler,
    UpdatePublicationCommand,
    UpdatePublicationHandler,
    DeletePublicationCommand,
    DeletePublicationHandler,
    GetPublicationsQuery,
    GetPublicationsHandler,
    GetCommentsQuery,
    GetCommentsHandler,
    CreateCommentCommand,
    CreateCommentHandler,
    DeleteCommentCommand,
    DeleteCommentHandler,
    CountCommentsPublicationsQuery,
    CountCommentsPublicationsHandler,
    GetPublicationQuery,
    GetPublicationQueryHandler,
    PublicationServiceGrpc,
    CommentsServiceGrpc,
    JwtStrategy,
    NotificationsService,
  ],
})
export class PublicationsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
