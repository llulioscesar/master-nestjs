import { User, Auth } from '../models';
import { Email, Password } from '../value-objects';

export abstract class UserService {
  abstract login(email: Email, password: Password): Promise<Auth>;
  abstract create(user: User): Promise<User>;
  abstract getUserById(id: string): Promise<User>;
  abstract getUsersByIds(ids: string[]): Promise<User[]>;
}
