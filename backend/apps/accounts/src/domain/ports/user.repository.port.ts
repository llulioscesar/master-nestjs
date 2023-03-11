import { User } from '../models';
import { Email, Username } from '../value-objects';

export abstract class UserRepositoryPort {
  abstract findById(id: string): Promise<User | null>;
  abstract findByUsername(username: Username): Promise<User | null>;
  abstract findByEmail(email: Email): Promise<User | null>;
  abstract created(user: User): Promise<User>;
  abstract updated(user: User): Promise<User>;
  abstract getUsersByIds(ids: string[]): Promise<User[]>;
}
