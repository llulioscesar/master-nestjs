import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AccountsService } from './accounts.service';
import { PublicationsService } from './publications.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ACCOUNTS_SERVICE',
        transport: Transport.GRPC,
        options: {
          url: `${process.env.GRPC_ACCOUNTS}`,
          package: 'accounts',
          protoPath: ['/usr/src/app/proto/accounts/accounts.proto'],
        },
      },
      {
        name: 'PUBLICATIONS_SERVICE',
        transport: Transport.GRPC,
        options: {
          url: `${process.env.GRPC_PUBLICATIONS}`,
          package: 'publications',
          protoPath: ['/usr/src/app/proto/publications/publications.proto'],
        },
      },
    ]),
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService, AccountsService, PublicationsService],
})
export class NotificationsModule {}
