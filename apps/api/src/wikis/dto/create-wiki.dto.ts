import { IsString, IsOptional } from 'class-validator';

export class CreateWikiDto {
  @IsString()
  title: string;

  @IsString()
  subHeading: string;

  @IsString()
  body: string;

  @IsString()
  @IsOptional()
  tag?: string;
}
