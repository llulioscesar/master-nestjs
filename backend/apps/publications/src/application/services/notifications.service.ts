import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { NotificationsServiceClient } from '../../../../../proto/notifications/notifications.pb';
import { Observable } from 'rxjs';
import { Empty } from '../../../../../proto/notifications/google/protobuf/empty.pb';

@Injectable()
export class NotificationsService implements OnModuleInit {
  private service: NotificationsServiceClient;

  constructor(
    @Inject('NOTIFICATIONS_SERVICE')
    private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.service = this.client.getService<NotificationsServiceClient>(
      'NotificationsService',
    );
  }

  sendNotification(
    userId: string,
    content: string,
    publicationId: string,
  ): Observable<Empty> {
    return this.service.send({
      userId,
      content,
      publicationId,
    });
  }
}
