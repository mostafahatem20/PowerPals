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
  street: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  number: number;

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
