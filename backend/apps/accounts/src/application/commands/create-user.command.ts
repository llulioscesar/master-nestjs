import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { User } from '../../domain/models';
import { UserService } from '../services';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserDto } from '../dtos';

export class CreateUserCommand implements ICommand {
  constructor(public readonly user: User) {}
}

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly service: UserService,
    private eventEmitter: EventEmitter2,
  ) {}

  async execute(command: CreateUserCommand): Promise<UserDto> {
    const { user } = command;

    const savedUser = await this.service.create(user);

    user.profile.userId = savedUser.id;

    this.eventEmitter.emit('user.created', user);

    const dto = new UserDto();
    dto.id = user.id;
    dto.role = user.role.value;
    dto.username = user.username.value;
    dto.email = user.email.value;
    dto.first_name = user.profile.firstName;
    dto.last_name = user.profile.lastName;

    return dto;
  }
}
