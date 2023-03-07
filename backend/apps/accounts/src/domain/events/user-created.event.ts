import { User } from '../models/user.entity';

export class UserCreatedEvent {
  constructor(public readonly user: User) {}
}
