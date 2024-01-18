import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../database/database.module';
import { userProviders } from './users.providers';
import { UsersProfilesModule } from 'src/users-profiles/users-profiles.module';
import { MulterModule } from '@nestjs/platform-express';
import { CommunitiesModule } from 'src/communities/communities.module';

@Module({
  imports: [
    DatabaseModule,
    UsersProfilesModule,
    MulterModule.register({
      dest: '/files',
    }),
    CommunitiesModule,
  ],
  controllers: [UsersController],
  providers: [...userProviders, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
