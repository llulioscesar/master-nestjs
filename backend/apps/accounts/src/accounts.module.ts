import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from './application/controllers';
import { ProfileService, UserService } from './application/services';
import { DatabaseModule } from './infrastructure/database';
import {
  CreateProfileCommand,
  CreateProfileHandler,
  CreateUserCommand,
  CreateUserHandler,
} from './application/commands';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CqrsModule } from '@nestjs/cqrs';
import { ProfileController } from './application/controllers/profile.controller';
import {
  GetUsersnamesHandler,
  GetUsersnamesQuery,
  LoginHandler,
  LoginQuery,
} from './application/queries';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy, LoggerMiddleware } from '../../../shared';

@Module({
  imports: [
    DatabaseModule,
    EventEmitterModule.forRoot(),
    CqrsModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN,
        algorithm: `${process.env.JWT_ALGORITHM}` as any,
      },
    }),
  ],
  controllers: [UserController, ProfileController],
  providers: [
    UserService,
    ProfileService,
    JwtStrategy,
    CreateUserCommand,
    CreateUserHandler,
    CreateProfileCommand,
    CreateProfileHandler,
    LoginQuery,
    LoginHandler,
    GetUsersnamesQuery,
    GetUsersnamesHandler,
  ],
})
export class AccountsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
