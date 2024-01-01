import { IsString } from 'class-validator';

export class CreateNewsStickerDto {
  @IsString()
  title: string;

  @IsString()
  subHeading: string;

  @IsString()
  body: string;
}
