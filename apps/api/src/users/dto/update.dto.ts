import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateUserDto } from './update-user.dto';
import { UpdateUsersProfileDto } from 'src/users-profiles/dto/update-users-profile.dto';
import { UpdateCommunityDto } from 'src/communities/dto/update-community.dto';

export class UpdateDto {
  @ValidateNested()
  @Type(() => UpdateUserDto)
  user: UpdateUserDto;

  @ValidateNested()
  @Type(() => UpdateUsersProfileDto)
  profile: UpdateUsersProfileDto;

  @ValidateNested()
  @Type(() => UpdateCommunityDto)
  community: UpdateCommunityDto;
}
