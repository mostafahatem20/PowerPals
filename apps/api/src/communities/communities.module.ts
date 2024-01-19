import { Module } from '@nestjs/common';
import { CommunitiesService } from './communities.service';
import { DatabaseModule } from 'src/database/database.module';
import { communityProviders } from './communities.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...communityProviders, CommunitiesService],
  exports: [CommunitiesService],
})
export class CommunitiesModule {}
