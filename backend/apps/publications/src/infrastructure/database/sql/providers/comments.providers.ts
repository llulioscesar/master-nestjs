import { DataSource } from 'typeorm';
import { CommentEntity } from '../entities';

export const commentsProviders = [
  {
    provide: 'COMMENTS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CommentEntity),
    inject: ['DATA_SOURCE'],
  },
];
