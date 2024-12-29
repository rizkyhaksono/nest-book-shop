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

    const book = await this.prisma.book.findUnique({
      where: {
        id: bookId
      }
    });

    if (!book) {
      throw new ConflictException(`Book not found with id: ${bookId}`);
    }

    if (!book.available) {
      throw new ConflictException(`Book with id: ${bookId} is not available`);
    }

    await this.prisma.book.update({
      where: {
        id: bookId
      },
      data: {
        available: false
      }
    });

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

  async getRentalById(id: string) {
    const rental = await this.prisma.rental.findUnique({
      where: {
        id: parseInt(id)
      }
    })

    if (!rental) {
      throw new ConflictException(`Rental not found with id: ${id}`);
    }

    return {
      status: 200,
      data: rental
    }
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

  async deleteRental(id: string) {
    if (!id) {
      throw new ConflictException("id is required");
    }

    const rental = await this.prisma.rental.findUnique({
      where: {
        id: parseInt(id)
      }
    });

    if (!rental) {
      throw new ConflictException(`Rental not found with id: ${id}`);
    }

    await this.prisma.book.update({
      where: {
        id: rental.bookId
      },
      data: {
        available: true
      }
    });

    return this.prisma.rental.delete({
      where: {
        id: parseInt(id)
      }
    });
  }
}