import { Module } from '@nestjs/common';
import { NewsStickersService } from './news-stickers.service';
import { NewsStickersController } from './news-stickers.controller';
import { DatabaseModule } from '../database/database.module';
import { newsStickerProviders } from './news-stickers.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [NewsStickersController],
  providers: [...newsStickerProviders, NewsStickersService],
  exports: [NewsStickersService],
})
export class NewsStickersModule {}
