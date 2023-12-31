import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateUserDto } from './update-user.dto';
import { UpdateUsersProfileDto } from 'src/users-profiles/dto/update-users-profile.dto';

export class UpdateDto {
  @ValidateNested()
  @Type(() => UpdateUserDto)
  user: UpdateUserDto;

  @ValidateNested()
  @Type(() => UpdateUsersProfileDto)
  profile: UpdateUsersProfileDto;
}
