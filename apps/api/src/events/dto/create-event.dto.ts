import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsDate,
  IsLatitude,
  IsLongitude,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  eventDateTime: Date;

  @IsString()
  @IsNotEmpty()
  addressName: string;

  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  number: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  postalCode: number;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsLatitude()
  lat: number;

  @IsLongitude()
  lng: number;

  @IsString()
  info: string;
}
