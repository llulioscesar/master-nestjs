import { User } from '../models';

export abstract class UserService {
  abstract create(user: User): Promise<User>;
  abstract getUserById(id: string): Promise<User>;
}
