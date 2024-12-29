import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma.service';
import { RentalDTO } from './dto/rental.dto';

@Injectable()
export class RentalService {
  constructor(private readonly prisma: PrismaService) { }

  async createRental(data: RentalDTO) {
    const { userId, bookId, startDate, endDate } = data;

    if (!userId || !bookId || !startDate || !endDate) {
      throw new ConflictException("All fields are required");
    }

    const createRental = await this.prisma.rental.create({
      data: {
        userId,
        bookId,
        startDate,
        endDate
      }
    });

    return {
      status: 201,
      data: createRental
    }
  }

  async getAllRental() {
    return this.prisma.rental.findMany();
  }

  async getRentalById(id: number) {
    return this.prisma.rental.findUnique({
      where: {
        id
      }
    })
  }

  async updateRental(id: number, data: RentalDTO) {
    const { userId, bookId, startDate, endDate } = data;

    if (!userId || !bookId || !startDate || !endDate) {
      throw new ConflictException("All fields are required");
    }

    const updateRental = await this.prisma.rental.update({
      where: {
        id
      },
      data: {
        userId,
        bookId,
        startDate,
        endDate
      }
    });

    return {
      status: 200,
      data: updateRental
    }
  }

  async deleteRental(id: number) {
    return this.prisma.rental.delete({
      where: {
        id
      }
    });
  }
}