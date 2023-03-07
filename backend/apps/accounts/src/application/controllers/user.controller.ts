import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../commands';
import { AuthDto, CreateUserDto, LoginDto, UserDto } from '../dtos';
import { Profile, User } from '../../domain/models';
import { Email, Password, Role, Username } from '../../domain/value-objects';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import {LoginQuery} from "../queries";

@Controller('users')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

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

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: LoginDto, description: 'Login User' })
  @ApiResponse({ status: HttpStatus.OK, type: UserDto })
  async login(@Body() loginUserDto: LoginDto): Promise<AuthDto> {
    const { email, password } = loginUserDto;
    const command = new LoginQuery(new Email(email), new Password(password));
    return this.queryBus.execute<LoginQuery, AuthDto>(command);
  }
}
