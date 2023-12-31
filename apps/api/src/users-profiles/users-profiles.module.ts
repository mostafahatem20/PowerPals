import { Module } from '@nestjs/common';
import { UsersProfilesService } from './users-profiles.service';
import { DatabaseModule } from '../database/database.module';
import { usersProfilesProviders } from './users-profiles.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...usersProfilesProviders, UsersProfilesService],
  exports: [UsersProfilesService],
})
export class UsersProfilesModule {}
