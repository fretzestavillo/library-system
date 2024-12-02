import { IsString } from 'class-validator';

export class LBSInput {
  @IsString()
  bookName: string;

  @IsString()
  bookAuthor: string;

  @IsString()
  bookPages: string;

  @IsString()
  bookPrice: string;
}
