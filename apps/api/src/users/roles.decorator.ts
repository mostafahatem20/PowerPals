import { SetMetadata } from '@nestjs/common';
import { UserType } from './entities/user.entity';

export const ROLE_KEY = 'type';
export const Role = (type: UserType) => SetMetadata(ROLE_KEY, type);
