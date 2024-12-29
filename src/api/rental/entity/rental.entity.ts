import { ApiProperty } from '@nestjs/swagger';
import { Rental } from '@prisma/client';

export class RentalEntity implements Rental {
  constructor(partial: Partial<RentalEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  bookId: number;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date;

  @ApiProperty()
  createdAt: Date;
}
