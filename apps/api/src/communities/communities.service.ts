import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UpdateCommunityDto } from './dto/update-community.dto';
import { Community } from './entities/community.entity';

@Injectable()
export class CommunitiesService {
  constructor(
    @Inject('COMMUNITIES_REPOSITORY')
    private communityRepository: Repository<Community>,
  ) {}

  create(community: UpdateCommunityDto) {
    return this.communityRepository.save(community);
  }
}
