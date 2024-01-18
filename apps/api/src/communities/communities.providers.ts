import { DataSource } from 'typeorm';
import { Community } from './entities/community.entity';

export const communityProviders = [
  {
    provide: 'COMMUNITIES_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Community),
    inject: ['DATA_SOURCE'],
  },
];
