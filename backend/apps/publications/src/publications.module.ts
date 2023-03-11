import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import {
  CommentsController,
  PublicationsController,
} from './application/controllers';
import { CommentsService, PublicationsService } from './application/services';
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
import {
  GetPublicationQuery,
  GetPublicationQueryHandler,
} from './application/queries/get-publication.query';

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
  controllers: [PublicationsController, CommentsController],
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
    JwtStrategy,
  ],
})
export class PublicationsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
