import {
  IsOptional,
  IsEnum,
  IsString,
  IsBoolean,
  IsNumber,
  IsNotEmpty,
  IsPhoneNumber,
} from 'class-validator';
import { UserProfileType } from '../entities/users-profile.entity';

export class CreateUsersProfileDto {
  @IsOptional()
  @IsPhoneNumber()
  telephoneNumber: string;

  @IsOptional()
  @IsString()
  profileImage: string;

  @IsNotEmpty()
  @IsEnum(UserProfileType)
  type: UserProfileType;

  @IsOptional()
  @IsString()
  size: string;

  @IsOptional()
  @IsBoolean()
  solar: boolean;

  @IsOptional()
  @IsBoolean()
  electricityStorage: boolean;

  @IsOptional()
  @IsString()
  addressName: string;

  @IsOptional()
  @IsString()
  street: string;

  @IsOptional()
  @IsNumber()
  number: number;

  @IsOptional()
  @IsNumber()
  postalCode: number;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsNumber()
  lat: number;

  @IsOptional()
  @IsNumber()
  lng: number;

  @IsOptional()
  @IsString()
  meterNumber: string;

  @IsOptional()
  @IsString()
  networkProvider: string;
}
