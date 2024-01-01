import { Module } from '@nestjs/common';
import { WikisService } from './wikis.service';
import { WikisController } from './wikis.controller';
import { DatabaseModule } from '../database/database.module';
import { wikiProviders } from './wikis.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [WikisController],
  providers: [...wikiProviders, WikisService],
  exports: [WikisService],
})
export class WikisModule {}
