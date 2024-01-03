import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { DatabaseModule } from '../database/database.module';
import { eventProviders } from './events.providers';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [EventsController],
  providers: [...eventProviders, EventsService],
  exports: [EventsService],
})
export class EventsModule {}
