import { DataSource } from 'typeorm';
import { entities } from './entities';
import { migrations } from './providers/migrations';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [...entities],
        migrations: [...migrations],
        migrationsRun: true,
        synchronize: false,
      });
      return dataSource.initialize();
    },
  },
];
