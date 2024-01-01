import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WikisService } from './wikis.service';
import { CreateWikiDto } from './dto/create-wiki.dto';
import { UpdateWikiDto } from './dto/update-wiki.dto';

@Controller('wikis')
export class WikisController {
  constructor(private readonly wikisService: WikisService) {}

  @Post()
  create(@Body() createWikiDto: CreateWikiDto) {
    return this.wikisService.create(createWikiDto);
  }

  @Get()
  findAll() {
    return this.wikisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wikisService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWikiDto: UpdateWikiDto) {
    return this.wikisService.update(+id, updateWikiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wikisService.remove(+id);
  }
}
