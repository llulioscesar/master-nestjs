import { OnEvent } from '@nestjs/event-emitter';
import { User } from '../../domain/models';

export class UserCreatedEvent {
  constructor(public readonly user: User) {}
}

export class UserCreatedListener {
  @OnEvent('user.created', { async: true })
  handleUserCreatedEvent(
    event: UserCreatedEvent,
    callback?: (data: User) => void,
  ) {
    if (callback) {
      callback(event.user);
    }
  }
}
