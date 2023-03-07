import { Factory, Seeder } from 'typeorm-seeding';
import { UserEntity } from '../entities';

export class UsersSeed implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(UserEntity)()
      .map(async (user: UserEntity) => {
        user.password = '123456';
        return user;
      })
      .createMany(10);
  }
}
