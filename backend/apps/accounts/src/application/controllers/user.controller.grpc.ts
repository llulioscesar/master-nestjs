import { Controller } from '@nestjs/common';
import { UsersServiceGrpc } from '../services';
import { GrpcMethod } from '@nestjs/microservices';
import {
  GetUserRequest,
  GetUserResponse,
} from '../../../../../proto/accounts/accounts.pb';

@Controller()
export class UserControllerGrpc {
  constructor(private readonly service: UsersServiceGrpc) {}

  @GrpcMethod('AccountsService', 'GetUser')
  async getUser(data: GetUserRequest): Promise<GetUserResponse> {
    const user = await this.service.getUserById(data.id);
    return {
      username: user.username.value,
      id: user.id,
      email: user.email.value,
    };
  }
}
