import { Inject, Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { UserRepositoryPort } from '../../../../domain/ports';
import { User } from '../../../../domain/models';
import {
  Email,
  Password,
  Role,
  Username,
} from '../../../../domain/value-objects';
import { UserEntity } from '../entities';

@Injectable()
export class UserRepository implements UserRepositoryPort {
  constructor(
    @Inject('USERS_REPOSITORY')
    private readonly repository: Repository<UserEntity>,
  ) {}

  async created(user: User): Promise<User> {
    const userEntity = new UserEntity();
    userEntity.email = user.email.value;
    userEntity.username = user.username.value;
    userEntity.password = await user.password.encrypt();
    userEntity.role = user.role.value;

    const savedUser = await this.repository.save(userEntity);
    user.id = savedUser.id;

    return user;
  }

  async findByEmail(email: Email): Promise<User | null> {
    const dbUser = await this.repository.findOne({
      where: { email: email.value },
    });

    return dbUser
      ? new User({
          id: dbUser.id,
          password: new Password(dbUser.password),
          email: new Email(dbUser.email),
          username: new Username(dbUser.username),
          role: new Role(dbUser.role),
        })
      : null;
  }

  async findById(id: string): Promise<User | null> {
    const dbUser = await this.repository.findOne({
      where: { id },
    });

    return dbUser
      ? new User({
          id: dbUser.id,
          email: new Email(dbUser.email),
          username: new Username(dbUser.username),
          role: new Role(dbUser.role),
        })
      : null;
  }

  async updated(user: User): Promise<User> {
    const userCopy = this.findById(user.id);
    if (userCopy) {
      const userEntity = new UserEntity();
      userEntity.id = user.id;
      userEntity.email = user.email.value;
      userEntity.username = user.username.value;
      userEntity.password = user.password.value;
      userEntity.role = user.role.value;

      await this.repository.save(userEntity);
      return user;
    }
    throw new Error('User not found');
  }

  async findByUsername(username: Username): Promise<User | null> {
    const dbUser = await this.repository.findOne({
      where: { username: username.value },
    });

    return dbUser
      ? new User({
          id: dbUser.id,
          email: new Email(dbUser.email),
          username: new Username(dbUser.username),
          role: new Role(dbUser.role),
        })
      : null;
  }

  async getUsersByIds(ids: string[]): Promise<User[]> {
    const find = await this.repository.find({
      where: {
        id: In(ids),
      },
    });

    return find.map((entity) => {
      return new User({
        id: entity.id,
        email: new Email(entity.email),
        username: new Username(entity.username),
        role: new Role(entity.role),
      });
    });
  }
}
