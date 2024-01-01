import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { DatabaseModule } from './database/database.module';
import { UsersProfilesModule } from './users-profiles/users-profiles.module';
import { RolesGuard } from './users/roles.guard';
import { UsersModule } from './users/users.module';
import { WikisModule } from './wikis/wikis.module';
import { NewsStickersModule } from './news-stickers/news-stickers.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'client', 'build'),
    }),
    AuthModule,
    UsersModule,
    DatabaseModule,
    UsersProfilesModule,
    WikisModule,
    NewsStickersModule,
    EventsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
