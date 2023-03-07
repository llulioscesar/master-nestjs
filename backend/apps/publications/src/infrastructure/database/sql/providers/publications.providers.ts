import { PublicationEntity } from '../entities';
import { DataSource } from 'typeorm';

export const publicationsProviders = [
  {
    provide: 'PUBLICATIONS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(PublicationEntity),
    inject: ['DATA_SOURCE'],
  },
];
