import { DataSource } from 'typeorm';
import { Wiki } from './entities/wiki.entity';

export const wikiProviders = [
  {
    provide: 'WIKIS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Wiki),
    inject: ['DATA_SOURCE'],
  },
];
