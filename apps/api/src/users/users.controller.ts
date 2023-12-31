import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from 'src/auth/auth.decorator';
import { Role } from './roles.decorator';
import { UserType } from './entities/user.entity';
import { UpdateDto } from './dto/update.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(
    @Request() req,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('byDistance') byDistance,
  ) {
    return this.usersService.findAll(
      { page, limit, byDistance: byDistance === 'true' },
      req.user,
    );
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.usersService.findOne(+id, req.user);
  }

  @Patch(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body()
    updateUserDto: UpdateDto,
  ) {
    return this.usersService.update(+id, updateUserDto, req.user);
  }

  @Role(UserType.ORGANIZER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
