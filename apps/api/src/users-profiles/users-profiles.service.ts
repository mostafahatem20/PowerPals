import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UpdateUsersProfileDto } from './dto/update-users-profile.dto';
import { UsersProfile } from './entities/users-profile.entity';

@Injectable()
export class UsersProfilesService {
  constructor(
    @Inject('USERS_PROFILES_REPOSITORY')
    private usersProfileRepository: Repository<UsersProfile>,
  ) {}

  create(userProfile: UpdateUsersProfileDto) {
    return this.usersProfileRepository.create(userProfile);
  }

  async findUsersWithinRadius(
    lat: number,
    lng: number,
    userId: number,
    page = 1,
    limit = 10,
    radiusKm = 5,
  ) {
    const skip = (page - 1) * limit; // Calculate the number of records to skip
    const usersWithinRadius = await this.usersProfileRepository
      .createQueryBuilder('up')
      .select('u.id, u.name, u.email, up.profileImage') // Adjust fields as needed
      .innerJoin('up.user', 'u')
      .where(
        `ST_DWithin(
          ST_SetSRID(ST_MakePoint(up.lng, up.lat), 4326)::geography,
          ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326)::geography,
          :radius * 1000
        )`, // Convert radiusKm to meters
        {
          longitude: lng,
          latitude: lat,
          radius: radiusKm,
        },
      )
      .andWhere('u.id != :userId', { userId })
      .offset(skip) // Skip records based on pagination
      .limit(limit) // Take a limited number of records per page
      .getRawMany();

    return usersWithinRadius;
  }
}
