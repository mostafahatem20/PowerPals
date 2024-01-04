import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  Query,
  Request,
} from '@nestjs/common';
import { NewsStickersService } from './news-stickers.service';
import { CreateNewsStickerDto } from './dto/create-news-sticker.dto';
import { UpdateNewsStickerDto } from './dto/update-news-sticker.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from 'src/utils/utils';
import { Role } from 'src/users/roles.decorator';
import { UserType } from 'src/users/entities/user.entity';
import { Public } from 'src/auth/auth.decorator';

@Controller('news-stickers')
export class NewsStickersController {
  constructor(private readonly newsStickersService: NewsStickersService) {}

  @Role(UserType.ORGANIZER)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
    }),
  )
  @Post()
  create(
    @Request() req,
    @Body() createNewsStickerDto: CreateNewsStickerDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'png|jpeg|jpg',
        })
        .build({
          fileIsRequired: false,
        }),
    )
    file?: Express.Multer.File,
  ) {
    return this.newsStickersService.create(
      createNewsStickerDto,
      file,
      req.user,
    );
  }

  @Public()
  @Get()
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('searchTitle') searchTitle,
  ) {
    return this.newsStickersService.findAll({ page, limit, searchTitle });
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsStickersService.findOne(+id);
  }

  @Role(UserType.ORGANIZER)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
    }),
  )
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNewsStickerDto: UpdateNewsStickerDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'png|jpeg|jpg',
        })
        .build({
          fileIsRequired: false,
        }),
    )
    file?: Express.Multer.File,
  ) {
    return this.newsStickersService.update(+id, updateNewsStickerDto, file);
  }

  @Role(UserType.ORGANIZER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsStickersService.remove(+id);
  }
}
