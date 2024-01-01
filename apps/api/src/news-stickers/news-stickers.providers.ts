import { DataSource } from 'typeorm';
import { NewsSticker } from './entities/news-sticker.entity';

export const newsStickerProviders = [
  {
    provide: 'NEWS_STICKERS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(NewsSticker),
    inject: ['DATA_SOURCE'],
  },
];
