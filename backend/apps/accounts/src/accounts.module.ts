import { Module } from '@nestjs/common';
import { UserController } from './application/controllers';
import { ProfileService, UserService } from './application/services';
import { DatabaseModule } from './infrastructure/database';
import { CreateUserCommand, CreateUserHandler } from './application/commands';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CqrsModule } from '@nestjs/cqrs';
import { ProfileController } from './application/controllers/profile.controller';
import {
  CreateProfileCommand,
  CreateProfileHandler,
} from './application/commands/create-profile.command';
import { LoginHandler, LoginQuery } from './application/queries';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../../../libs/utils/src';

@Module({
  imports: [
    DatabaseModule,
    EventEmitterModule.forRoot(),
    CqrsModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d', algorithm: 'HS256' },
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
  ],
})
export class AccountsModule {}
