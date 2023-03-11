import { Inject, Injectable } from '@nestjs/common';
import { Auth, User } from '../../domain/models';
import { UserService as Service } from '../../domain/services';
import { UserRepository } from '../../infrastructure/database';
import { Email, Password } from '../../domain/value-objects';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService implements Service {
  constructor(
    @Inject(UserRepository)
    private readonly repository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async create(user: User): Promise<User> {
    return await this.repository.created(user);
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async login(email: Email, password: Password): Promise<Auth> {
    const user = await this.repository.findByEmail(email);

    if (!user) {
      throw new Error('User not found');
    }

    if (!password.compare(user.password.value)) {
      throw new Error('Invalid password');
    }

    const token = this.jwtService.sign({
      user: {
        id: user.id,
        email: user.email.value,
        role: user.role.value,
      },
    });

    const expireToken = new Date();
    expireToken.setDate(expireToken.getDate() + 1);

    return new Auth({
      user: new User({
        id: user.id,
        email: user.email,
        role: user.role,
        username: user.username,
      }),
      token,
      expireToken: expireToken,
    });
  }

  async getUsersByIds(ids: string[]): Promise<User[]> {
    return this.repository.getUsersByIds(ids);
  }
}
