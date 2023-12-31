import { DataSource } from 'typeorm';
import { UsersProfile } from './entities/users-profile.entity';

export const usersProfilesProviders = [
  {
    provide: 'USERS_PROFILES_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UsersProfile),
    inject: ['DATA_SOURCE'],
  },
];
