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
} from '@nestjs/common';
import { WikisService } from './wikis.service';
import { CreateWikiDto } from './dto/create-wiki.dto';
import { UpdateWikiDto } from './dto/update-wiki.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from 'src/utils/utils';
import { Role } from 'src/users/roles.decorator';
import { UserType } from 'src/users/entities/user.entity';
import { Public } from 'src/auth/auth.decorator';

@Controller('wikis')
export class WikisController {
  constructor(private readonly wikisService: WikisService) {}

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
    @Body() createWikiDto: CreateWikiDto,
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
    return this.wikisService.create(createWikiDto, file);
  }

  @Public()
  @Get()
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('tag') tag,
  ) {
    return this.wikisService.findAll({ page, limit, tag });
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wikisService.findOne(+id);
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
    @Body() updateWikiDto: UpdateWikiDto,
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
    return this.wikisService.update(+id, updateWikiDto, file);
  }

  @Role(UserType.ORGANIZER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wikisService.remove(+id);
  }
}
