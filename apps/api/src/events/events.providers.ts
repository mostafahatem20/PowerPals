import { DataSource } from 'typeorm';
import { Event } from './entities/event.entity';

export const eventProviders = [
  {
    provide: 'EVENTS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Event),
    inject: ['DATA_SOURCE'],
  },
];
