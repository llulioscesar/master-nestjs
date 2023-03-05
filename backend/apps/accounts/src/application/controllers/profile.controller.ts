import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { User } from '../../domain/models';
import { CommandBus } from '@nestjs/cqrs';
import { CreateProfileCommand } from '../commands/create-profile.command';
import { ProfileDto } from '../dtos';

@Controller('profile')
export class ProfileController {
  constructor(private readonly commandBus: CommandBus) {}

  @EventPattern('user.created')
  async handleUserCreatedEvent(user: User) {
    const command = new CreateProfileCommand(user.profile);
    await this.commandBus.execute<CreateProfileCommand, ProfileDto>(command);
    return `Profile created for user ${user.username.value}`;
  }
}
