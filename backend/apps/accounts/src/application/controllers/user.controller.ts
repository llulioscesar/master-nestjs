import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../commands';
import { CreateUserDto, UserDto } from '../dtos';
import { Profile, User } from '../../domain/models';
import { Email, Password, Role, Username } from '../../domain/value-objects';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: CreateUserDto, description: 'Create User' })
  @ApiResponse({ status: HttpStatus.CREATED, type: UserDto })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    const { username, email, password, role, first_name, last_name } =
      createUserDto;

    const profile = new Profile({
      firstName: first_name,
      lastName: last_name,
    });

    const user = new User({
      username: new Username(username),
      email: new Email(email),
      password: new Password(password),
      role: new Role(role),
      profile,
    });

    const command = new CreateUserCommand(user);
    return this.commandBus.execute<CreateUserCommand, UserDto>(command);
  }
}
