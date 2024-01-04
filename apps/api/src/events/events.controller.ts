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
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Role } from 'src/users/roles.decorator';
import { UserType } from 'src/users/entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from 'src/utils/utils';
import { Public } from 'src/auth/auth.decorator';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

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
    @Body() createEventDto: CreateEventDto,
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
    return this.eventsService.create(createEventDto, file, req.user);
  }

  @Public()
  @Get()
  findAll(
    @Request() req,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('searchTitle') searchTitle,
  ) {
    return this.eventsService.findAll({ page, limit, searchTitle }, req.user);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }

  @Public()
  @Post(':id')
  register(
    @Request() req,
    @Param('id') id: string,
    @Body() user: { name: string; email: string },
  ) {
    return this.eventsService.register(+id, user, req.user);
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
    @Body() updateEventDto: UpdateEventDto,
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
    return this.eventsService.update(+id, updateEventDto, file);
  }

  @Role(UserType.ORGANIZER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }
}
