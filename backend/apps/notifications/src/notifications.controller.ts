import { Controller } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { GrpcMethod } from '@nestjs/microservices';
import { SendRequest } from '../../../proto/notifications/notifications.pb';

@Controller()
export class NotificationsController {
  constructor(private readonly service: NotificationsService) {}

  @GrpcMethod('NotificationsService', 'send')
  async send(data: SendRequest) {
    console.log('send', data);
    return this.service.notify({
      content: data.content,
      user_id: data.userId,
      publication_id: data.publicationId,
    });
  }
}
