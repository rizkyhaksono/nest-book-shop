import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma.service';
import { UpdateUserDTO } from './dto/user-update.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  async getUserById(uuid: string) {
    return this.prisma.user.findUnique({
      where: {
        uuid
      }
    });
  }

  async updateUser(uuid: string, data: UpdateUserDTO) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return this.prisma.user.update({
      where: {
        uuid
      },
      data
    });
  }

  async deleteUser(uuid: string) {
    return this.prisma.user.delete({
      where: {
        uuid
      }
    });
  }
}