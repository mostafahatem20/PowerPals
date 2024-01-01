import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsDate,
  IsLatitude,
  IsLongitude,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsDate()
  eventDateTime: Date;

  @IsString()
  @IsNotEmpty()
  street: string;

  @IsNumber()
  number: number;

  @IsNumber()
  postalCode: number;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsNumber()
  @IsLatitude()
  lat: number;

  @IsNumber()
  @IsLongitude()
  lng: number;

  @IsString()
  info: string;
}
