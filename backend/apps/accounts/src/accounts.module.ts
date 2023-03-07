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

@Module({
  imports: [DatabaseModule, EventEmitterModule.forRoot(), CqrsModule],
  controllers: [UserController, ProfileController],
  providers: [
    UserService,
    ProfileService,
    CreateUserCommand,
    CreateUserHandler,
    CreateProfileCommand,
    CreateProfileHandler,
  ],
})
export class AccountsModule {}
