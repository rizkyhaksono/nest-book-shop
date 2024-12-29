import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma.service';
import { CategoryDTO } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) { }

  async createCategory(data: CategoryDTO) {
    const { name } = data;

    if (!name) {
      throw new ConflictException("Name can't null");
    }

    const createCategory = await this.prisma.category.create({
      data: {
        name
      }
    });

    return {
      status: 201,
      data: createCategory
    }
  }

  async getAllCategory() {
    return this.prisma.category.findMany();
  }

  async getCategoryById(id: string) {
    return this.prisma.category.findUnique({
      where: {
        id: parseInt(id)
      }
    })
  }

  async updateCategory(id: number, data: CategoryDTO) {
    const { name } = data;

    if (!name) {
      throw new ConflictException("Name can't null");
    }

    const updateCategory = await this.prisma.category.update({
      where: {
        id
      },
      data: {
        name
      }
    });

    return {
      status: 200,
      data: updateCategory
    }
  }

  async deleteCategory(id: number) {
    return this.prisma.category.delete({
      where: {
        id
      }
    });
  }
}