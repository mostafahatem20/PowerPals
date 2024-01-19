import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateWikiDto } from './dto/create-wiki.dto';
import { UpdateWikiDto } from './dto/update-wiki.dto';
import { Wiki } from './entities/wiki.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
@Injectable()
export class WikisService {
  constructor(
    @Inject('WIKIS_REPOSITORY')
    private wikiRepository: Repository<Wiki>,
  ) {}
  async create(
    createWikiDto: CreateWikiDto,
    file: Express.Multer.File,
    currentUser: User,
  ) {
    return await this.wikiRepository.save({
      ...createWikiDto,
      image: file.filename || null,
      user: currentUser,
    });
  }

  findAll({
    page,
    limit,
    tag,
    searchTitle,
  }: {
    page: number;
    limit: number;
    tag: string;
    searchTitle?: string;
  }) {
    const skip = (page - 1) * limit; // Calculate the number of records to skip
    const query = this.wikiRepository.createQueryBuilder('w').select('w.*');

    if (tag) {
      query.where('w.tag = :tag', { tag }); // Filter records by the provided tag
    }
    if (searchTitle)
      query.andWhere(`LOWER(w.title) LIKE LOWER(:searchTerm)`, {
        searchTerm: `%${searchTitle.toLowerCase()}%`,
      }); // Case-insensitive title filter

    return query
      .offset(skip) // Skip records based on pagination
      .limit(limit) // Take a limited number of records per page
      .getRawMany();
  }

  async findOne(id: number) {
    const found = await this.wikiRepository.findOne({
      where: { id },
    });

    if (!found) {
      throw new NotFoundException('Wiki not found');
    }
    return found;
  }

  async update(
    id: number,
    updateWikiDto: UpdateWikiDto,
    file: Express.Multer.File,
  ) {
    const found = await this.wikiRepository.findOne({
      where: { id },
    });

    if (!found) {
      throw new NotFoundException('Wiki not found');
    }
    const update = { ...found, ...updateWikiDto };
    if (file) update.image = file.filename;
    return await this.wikiRepository.save(update);
  }

  async remove(id: number) {
    const found = await this.wikiRepository.findOne({
      where: { id },
    });

    if (!found) {
      throw new NotFoundException('Wiki not found');
    }
    return await this.wikiRepository.delete(id);
  }
}
