import { Module } from '@nestjs/common';
import { databaseProviders } from './postgres.provider';
import { ProfileRepository, UserRepository } from './repositories';
import { profilesProviders, usersProviders } from './providers';

@Module({
  providers: [
    ...databaseProviders,
    ...usersProviders,
    ...profilesProviders,
    UserRepository,
    ProfileRepository,
  ],
  exports: [
    ...databaseProviders,
    ...usersProviders,
    ...profilesProviders,
    UserRepository,
    ProfileRepository,
  ],
})
export class DatabaseModule {}
