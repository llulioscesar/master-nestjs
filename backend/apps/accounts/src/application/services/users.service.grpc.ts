import { GrpcService } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { UserService as Service } from '../../domain/services';
import { UserService } from './user.service';
import { Email, Password } from '../../domain/value-objects';
import { Auth, User } from '../../domain/models';

@Injectable()
@GrpcService()
export class UsersServiceGrpc implements Service {
  constructor(
    @Inject(UserService)
    private readonly service: UserService,
  ) {}

  async create(user: User): Promise<User> {
    return this.service.create(user);
  }

  async getUserById(id: string): Promise<User> {
    return this.service.getUserById(id);
  }

  async getUsersByIds(ids: string[]): Promise<User[]> {
    return this.service.getUsersByIds(ids);
  }

  async login(email: Email, password: Password): Promise<Auth> {
    return this.service.login(email, password);
  }
}
