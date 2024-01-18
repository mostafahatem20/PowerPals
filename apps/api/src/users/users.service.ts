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
import { User, UserType } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from 'src/auth/constants';
import { UsersProfilesService } from 'src/users-profiles/users-profiles.service';
import { UpdateDto } from './dto/update.dto';
import { CommunitiesService } from 'src/communities/communities.service';

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
    private readonly communitiesService: CommunitiesService,
  ) {}
  async save(user: User) {
    return await this.userRepository.save(user);
  }
  async create(createUserDto: CreateUserDto): Promise<Partial<User>> {
    const found = await this.findByEmail(createUserDto.email);
    if (found) {
      if (found.password)
        throw new BadRequestException('A user with this email already exists');
      const user = {
        ...found,
        ...createUserDto,
        password: createUserDto.password
          ? await bcrypt.hash(createUserDto.password, jwtConstants.salt)
          : null,
      };
      const { password, ...result } = await this.userRepository.save(user);
      return result;
    }
    const user = {
      ...createUserDto,
      password: createUserDto.password
        ? await bcrypt.hash(createUserDto.password, jwtConstants.salt)
        : null,
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

    const result = await this.userRepository
      .createQueryBuilder('u')
      .leftJoinAndSelect('u.profile', 'up')
      .select('u.id, u.name, u.email, u.type, up.profileImage')
      .where('u.id != :userId', { userId: found.id })
      .andWhere('u.type != :type', { type: 'organizer' })
      .offset(skip) // Skip records based on pagination
      .limit(limit) // Take a limited number of records per page
      .getRawMany();

    return result;
  }

  async findOne(id: number, currentUser: User) {
    if (currentUser.type !== UserType.ORGANIZER && currentUser.id !== id) {
      throw new ForbiddenException('Forbidden resource');
    }

    const found = await this.userRepository.findOne({
      where: { id },
      relations: ['profile', 'eventsRegistration', 'community'],
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
      relations: ['profile', 'eventsRegistration', 'community'],
    });

    if (!found) {
      throw new NotFoundException('User not found');
    }
    const { user, profile, community } = updateUserDto;
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
    if (community) {
      if (found.community) {
        found.community = { ...found.community, ...community };
      } else {
        const userCommunity = await this.communitiesService.create(community);
        found.community = userCommunity;
      }
    }
    await this.userRepository.save(found);
    const { password, ...result } = found;
    return result;
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
