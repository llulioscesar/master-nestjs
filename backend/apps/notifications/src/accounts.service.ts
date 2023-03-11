import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  AccountsServiceClient,
  GetUserResponse,
} from '../../../proto/accounts/accounts.pb';
import { Observable } from 'rxjs';

@Injectable()
export class AccountsService implements OnModuleInit {
  private service: AccountsServiceClient;

  constructor(
    @Inject('ACCOUNTS_SERVICE')
    private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.service =
      this.client.getService<AccountsServiceClient>('AccountsService');
  }

  getUserById(id: string): Observable<GetUserResponse> {
    return this.service.getUser({ id });
  }
}
