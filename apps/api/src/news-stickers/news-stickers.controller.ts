import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NewsStickersService } from './news-stickers.service';
import { CreateNewsStickerDto } from './dto/create-news-sticker.dto';
import { UpdateNewsStickerDto } from './dto/update-news-sticker.dto';

@Controller('news-stickers')
export class NewsStickersController {
  constructor(private readonly newsStickersService: NewsStickersService) {}

  @Post()
  create(@Body() createNewsStickerDto: CreateNewsStickerDto) {
    return this.newsStickersService.create(createNewsStickerDto);
  }

  @Get()
  findAll() {
    return this.newsStickersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsStickersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNewsStickerDto: UpdateNewsStickerDto,
  ) {
    return this.newsStickersService.update(+id, updateNewsStickerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsStickersService.remove(+id);
  }
}
