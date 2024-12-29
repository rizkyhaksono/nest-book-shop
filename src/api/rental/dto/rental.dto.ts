import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

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
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  endDate: Date;
}
