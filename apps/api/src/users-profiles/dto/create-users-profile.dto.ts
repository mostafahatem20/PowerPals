import {
  IsOptional,
  IsEnum,
  IsString,
  IsBoolean,
  IsNumber,
  IsNotEmpty,
  IsPhoneNumber,
  IsLatitude,
  IsLongitude,
} from 'class-validator';
import { UserProfileType } from '../entities/users-profile.entity';

export class CreateUsersProfileDto {
  @IsOptional()
  @IsPhoneNumber()
  telephoneNumber: string;

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
  @IsString()
  number: string;

  @IsOptional()
  @IsNumber()
  postalCode: number;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsNumber()
  @IsLatitude()
  lat: number;

  @IsOptional()
  @IsNumber()
  @IsLongitude()
  lng: number;

  @IsOptional()
  @IsString()
  meterNumber: string;

  @IsOptional()
  @IsString()
  networkProvider: string;
}
