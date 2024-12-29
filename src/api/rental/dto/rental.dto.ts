import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RentalDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  bookId: number;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  endDate: string;
}
