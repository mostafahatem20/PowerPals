import { PartialType } from '@nestjs/mapped-types';
import { CreateNewsStickerDto } from './create-news-sticker.dto';

export class UpdateNewsStickerDto extends PartialType(CreateNewsStickerDto) {}
