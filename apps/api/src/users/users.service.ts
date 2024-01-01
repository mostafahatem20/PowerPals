/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserType } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from 'src/auth/constants';
import { UpdateUsersProfileDto } from 'src/users-profiles/dto/update-users-profile.dto';
import { UsersProfile } from 'src/users-profiles/entities/users-profile.entity';
import { UsersProfilesService } from 'src/users-profiles/users-profiles.service';
import { UpdateDto } from './dto/update.dto';

interface findAllQuery {
  page: number;
  limit: number;
  byDistance: boolean;
}

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    private readonly usersProfileService: UsersProfilesService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Partial<User>> {
    const found = await this.findByEmail(createUserDto.email);
    if (found) {
      throw new BadRequestException('A user with this email already exists');
    }
    const user = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, jwtConstants.salt),
    };
    const { password, ...result } = await this.userRepository.save(user);
    return result;
  }

  async findAll({ page, limit, byDistance }: findAllQuery, currentUser: User) {
    const found = await this.userRepository.findOne({
      where: { id: currentUser.id },
      relations: ['profile'],
    });

    if (!found) {
      throw new NotFoundException('Current User not found');
    }
    const userProfile = found.profile;
    if (byDistance) {
      if (!userProfile || !userProfile.lat || !userProfile.lng) {
        throw new BadRequestException(
          'User profile with coordinates not found',
        );
      }
      return this.usersProfileService.findUsersWithinRadius(
        userProfile.lat,
        userProfile.lng,
        found.id,
        page,
        limit,
      );
    }
    const skip = (page - 1) * limit; // Calculate the number of records to skip

    return this.userRepository
      .createQueryBuilder('u')
      .select('u.id, u.name, u.email')
      .where('u.id != :userId', { userId: found.id })
      .skip(skip) // Skip records based on pagination
      .take(limit) // Take a limited number of records per page
      .getRawMany();
  }

  async findOne(id: number, currentUser: User) {
    if (currentUser.type !== UserType.ORGANIZER && currentUser.id !== id) {
      throw new ForbiddenException('Forbidden resource');
    }

    const found = await this.userRepository.findOne({
      where: { id },
      relations: ['profile'],
    });

    if (!found) {
      throw new NotFoundException('User not found');
    }
    const { password, ...result } = found;

    return result;
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }
  async update(
    id: number,
    updateUserDto: UpdateDto,
    file: Express.Multer.File,
    currentUser: User,
  ) {
    if (currentUser.type !== UserType.ORGANIZER && currentUser.id !== id) {
      throw new ForbiddenException('Forbidden resource');
    }
    const found = await this.userRepository.findOne({
      where: { id },
      relations: ['profile'],
    });

    if (!found) {
      throw new NotFoundException('User not found');
    }
    const { user, profile } = updateUserDto;
    if (user) {
      const { type, name, password } = user;

      if (currentUser.type !== UserType.ORGANIZER && type) {
        throw new ForbiddenException(
          'You are not authorized to update user type',
        );
      }
      if (type) found.type = type;
      if (name) found.name = name;
      if (password)
        found.password = await bcrypt.hash(password, jwtConstants.salt);
    }
    if (profile || file) {
      if (found.profile) {
        found.profile = { ...found.profile, ...profile };
        if (file) found.profile.profileImage = file.filename;
      } else {
        const userProfile = this.usersProfileService.create(profile);
        found.profile = userProfile;
        if (file) found.profile.profileImage = file.filename;
      }
    }
    await this.userRepository.save(found);
    return found;
  }

  async remove(id: number) {
    const found = await this.userRepository.findOne({
      where: { id },
    });

    if (!found) {
      throw new NotFoundException('User not found');
    }
    return await this.userRepository.delete(id);
  }
}
