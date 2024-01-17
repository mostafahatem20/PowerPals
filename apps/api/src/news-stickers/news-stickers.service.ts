import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNewsStickerDto } from './dto/create-news-sticker.dto';
import { UpdateNewsStickerDto } from './dto/update-news-sticker.dto';
import { Repository } from 'typeorm';
import { NewsSticker } from './entities/news-sticker.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class NewsStickersService {
  constructor(
    @Inject('NEWS_STICKERS_REPOSITORY')
    private newsStickerRepository: Repository<NewsSticker>,
  ) {}

  async create(
    createNewsStickerDto: CreateNewsStickerDto,
    file: Express.Multer.File,
    currentUser: User,
  ) {
    return await this.newsStickerRepository.save({
      ...createNewsStickerDto,
      image: file.filename || null,
      user: currentUser,
    });
  }
  findAll({
    page,
    limit,
    searchTitle,
  }: {
    page: number;
    limit: number;
    searchTitle?: string;
  }) {
    const skip = (page - 1) * limit; // Calculate the number of records to skip

    const query = this.newsStickerRepository
      .createQueryBuilder('n')
      .select('n.*');
    if (searchTitle)
      query.andWhere(`LOWER(n.title) LIKE LOWER(:searchTerm)`, {
        searchTerm: `%${searchTitle.toLowerCase()}%`,
      }); // Case-insensitive title filter
    return query
      .offset(skip) // Skip records based on pagination
      .limit(limit) // Take a limited number of records per page
      .getRawMany();
  }

  async findOne(id: number) {
    const found = await this.newsStickerRepository.findOne({
      where: { id },
    });

    if (!found) {
      throw new NotFoundException('NewsSticker not found');
    }
    return found;
  }

  async update(
    id: number,
    updateNewsStickerDto: UpdateNewsStickerDto,
    file: Express.Multer.File,
  ) {
    const found = await this.newsStickerRepository.findOne({
      where: { id },
    });

    if (!found) {
      throw new NotFoundException('NewsSticker not found');
    }
    const update = { ...found, ...updateNewsStickerDto };
    if (file) update.image = file.filename;
    return await this.newsStickerRepository.save(update);
  }

  async remove(id: number) {
    const found = await this.newsStickerRepository.findOne({
      where: { id },
    });

    if (!found) {
      throw new NotFoundException('NewsSticker not found');
    }
    return await this.newsStickerRepository.delete(id);
  }
}
