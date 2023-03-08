import { Module } from '@nestjs/common';
import { databaseProviders } from './postgres.provider';
import { commentsProviders, publicationsProviders } from './providers';
import { CommentsRepository, PublicationRepository } from './repository';

@Module({
  providers: [
    ...databaseProviders,
    ...publicationsProviders,
    ...commentsProviders,
    PublicationRepository,
    CommentsRepository,
  ],
  exports: [
    ...databaseProviders,
    ...publicationsProviders,
    ...commentsProviders,
    PublicationRepository,
    CommentsRepository,
  ],
})
export class DatabaseModule {}
