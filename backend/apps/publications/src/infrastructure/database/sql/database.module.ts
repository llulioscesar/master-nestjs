import { Module } from '@nestjs/common';
import { databaseProviders } from './postgres.provider';
import { publicationsProviders } from './providers';
import { PublicationRepository } from './repository';

@Module({
  providers: [
    ...databaseProviders,
    ...publicationsProviders,
    PublicationRepository,
  ],
  exports: [
    ...databaseProviders,
    ...publicationsProviders,
    PublicationRepository,
  ],
})
export class DatabaseModule {}
