import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../domain/models';
import { ProfileService } from './profile.service';
import { UserService as Service } from '../../domain/services';
import { UserRepository } from '../../infrastructure/database';
import { genSaltSync, hashSync } from 'bcrypt';
import { Password } from '../../domain/value-objects';

@Injectable()
export class UserService implements Service {
  constructor(
    @Inject(UserRepository)
    private readonly repository: UserRepository,
    @Inject(ProfileService)
    private readonly profileService: ProfileService,
  ) {}

  async create(user: User): Promise<User> {
    const salt = await genSaltSync(12);
    user.password = new Password(await hashSync(user.password.value, salt));

    return await this.repository.created(user);
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
