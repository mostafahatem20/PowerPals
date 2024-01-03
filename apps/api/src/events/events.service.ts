/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class EventsService {
  constructor(
    @Inject('EVENTS_REPOSITORY')
    private eventRepository: Repository<Event>,
    private readonly usersService: UsersService,
  ) {}
  async create(
    createEventDto: CreateEventDto,
    file: Express.Multer.File,
    currentUser: User,
  ) {
    return await this.eventRepository.save({
      ...createEventDto,
      image: file.filename || null,
      createdBy: currentUser,
    });
  }

  async findAll(
    { page, limit }: { page: number; limit: number },
    currentUser: User,
  ) {
    const skip = (page - 1) * limit; // Calculate the number of records to skip

    if (currentUser) {
      const user = await this.usersService.findOne(currentUser.id, currentUser);

      if (user.profile?.lat && user.profile?.lng) {
        return this.eventRepository
          .createQueryBuilder('e')
          .select('e.*')
          .addSelect(
            `ST_Distance(
          ST_SetSRID(ST_MakePoint(:userLng, :userLat), 4326)::geography,
          ST_SetSRID(ST_MakePoint(e.lng, e.lat), 4326)::geography
        )`,
            'distance',
          )
          .where(`e.eventDateTime > :currentDate`, { currentDate: new Date() })
          .orderBy('distance', 'ASC')
          .setParameters({
            userLat: user.profile.lat,
            userLng: user.profile.lng,
          })
          .skip(skip)
          .take(limit)
          .getRawMany();
      }
    }

    return this.eventRepository
      .createQueryBuilder('e')
      .select('e.*')
      .where(`e.eventDateTime > :currentDate`, { currentDate: new Date() })
      .skip(skip) // Skip records based on pagination
      .take(limit) // Take a limited number of records per page
      .getRawMany();
  }

  async findOne(id: number) {
    const found = await this.eventRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.createdBy', 'createdBy')
      .leftJoinAndSelect('createdBy.profile', 'profile')
      .where('event.id = :id', { id })
      .getOne();

    if (!found) {
      throw new NotFoundException('Event not found');
    }
    delete found.createdBy.password;
    return found;
  }

  async update(
    id: number,
    updateEventDto: UpdateEventDto,
    file: Express.Multer.File,
  ) {
    const found = await this.eventRepository.findOne({
      where: { id },
    });

    if (!found) {
      throw new NotFoundException('Event not found');
    }
    const update = { ...found, ...updateEventDto };
    if (file) update.image = file.filename;
    return await this.eventRepository.save(update);
  }

  async remove(id: number) {
    const found = await this.eventRepository.findOne({
      where: { id },
    });

    if (!found) {
      throw new NotFoundException('Event not found');
    }
    return await this.eventRepository.delete(id);
  }

  async register(
    id: number,
    user: { name: string; email: string },
    currentUser: User,
  ) {
    if (isObjectEmpty(user) && !currentUser) {
      throw new BadRequestException('User to be registered is empty');
    }
    if (!currentUser && !isObjectEmpty(user) && (!user.email || !user.name)) {
      throw new BadRequestException('User name and email are required');
    }
    const found = await this.eventRepository.findOne({
      where: { id },
    });

    if (!found) {
      throw new NotFoundException('Event not found');
    }
    if (currentUser) {
      const cUser = await this.usersService.findOne(
        currentUser.id,
        currentUser,
      );
      if (cUser.eventsRegistration.find((one) => one.id === found.id))
        throw new BadRequestException('Already Registered in Event');
      cUser.eventsRegistration.push(found);
      const { password, ...result } = await this.usersService.save(
        cUser as User,
      );
      return result;
    }
    const userCreated = await this.usersService.create(user as CreateUserDto);
    const cUser = await this.usersService.findOne(
      userCreated.id,
      userCreated as User,
    );
    if (cUser.eventsRegistration.find((one) => one.id === found.id))
      throw new BadRequestException('Already Registered in Event');
    cUser.eventsRegistration.push(found);
    const { password, ...result } = await this.usersService.save(cUser as User);
    return result;
  }
}

function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}
