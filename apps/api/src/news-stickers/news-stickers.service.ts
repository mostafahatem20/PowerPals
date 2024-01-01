import { Inject, Injectable } from '@nestjs/common';
import { CreateNewsStickerDto } from './dto/create-news-sticker.dto';
import { UpdateNewsStickerDto } from './dto/update-news-sticker.dto';
import { Repository } from 'typeorm';
import { NewsSticker } from './entities/news-sticker.entity';

@Injectable()
export class NewsStickersService {
  constructor(
    @Inject('NEWS_STICKERS_REPOSITORY')
    private newsStickerRepository: Repository<NewsSticker>,
  ) {}
  create(createNewsStickerDto: CreateNewsStickerDto) {
    return 'This action adds a new newsSticker';
  }

  findAll() {
    return `This action returns all newsStickers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} newsSticker`;
  }

  update(id: number, updateNewsStickerDto: UpdateNewsStickerDto) {
    return `This action updates a #${id} newsSticker`;
  }

  remove(id: number) {
    return `This action removes a #${id} newsSticker`;
  }
}
