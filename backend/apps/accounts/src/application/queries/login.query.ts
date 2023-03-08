import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserService } from '../services';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AuthDto, UserDto } from '../dtos';
import { Email, Password } from '../../domain/value-objects';

export class LoginQuery implements IQuery {
  constructor(
    public readonly email: Email,
    public readonly password: Password,
  ) {}
}

@QueryHandler(LoginQuery)
export class LoginHandler implements IQueryHandler<LoginQuery> {
  constructor(
    private readonly service: UserService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(command: LoginQuery): Promise<AuthDto> {
    const { email, password } = command;

    const auth = await this.service.login(email, password);
    this.eventEmitter.emit('user.authenticate', email);

    const userDto = new UserDto();
    userDto.id = auth.user.id;
    userDto.username = auth.user.username.value;
    userDto.email = auth.user.email.value;
    userDto.role = auth.user.role.value;

    const dto = new AuthDto();
    dto.token = auth.token;
    dto.user = userDto;
    dto.expire_token = auth.expireToken.toISOString();

    return dto;
  }
}
