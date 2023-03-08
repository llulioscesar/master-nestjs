import { ProfileEntity } from '../entities';
import { DataSource } from 'typeorm';

export const profilesProviders = [
  {
    provide: 'PROFILES_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ProfileEntity),
    inject: ['DATA_SOURCE'],
  },
];
