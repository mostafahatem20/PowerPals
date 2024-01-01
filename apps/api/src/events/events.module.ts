import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { DatabaseModule } from '../database/database.module';
import { eventProviders } from './events.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [EventsController],
  providers: [...eventProviders, EventsService],
  exports: [EventsService],
})
export class EventsModule {}
