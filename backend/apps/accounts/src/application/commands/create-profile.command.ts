import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { Profile } from '../../domain/models';
import { ProfileService } from '../services';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ProfileDto } from '../dtos';

export class CreateProfileCommand implements ICommand {
  constructor(public readonly profile: Profile) {}
}

@CommandHandler(CreateProfileCommand)
export class CreateProfileHandler
  implements ICommandHandler<CreateProfileCommand>
{
  constructor(
    private readonly service: ProfileService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(command: CreateProfileCommand): Promise<ProfileDto> {
    const { profile } = command;
    const savedProfile = await this.service.create(profile);
    profile.id = savedProfile.id;

    this.eventEmitter.emit('profile.created', profile);

    const dto = new ProfileDto();
    dto.id = profile.id;
    dto.first_name = profile.firstName;
    dto.last_name = profile.lastName;

    return dto;
  }
}
