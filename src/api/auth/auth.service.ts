import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDTO } from './dto/register.dto';
import { LoginEntity } from './entity/login.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) { }

  async login(email: string, password: string): Promise<LoginEntity> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email
      }
    })

    if (!user) {
      throw new NotFoundException(`User not found with email: ${email}`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new NotFoundException(`Invalid password`);
    }

    const accessToken = await this.jwtService.signAsync({
      uuid: user.uuid,
    })

    await this.prisma.user.update({
      where: {
        uuid: user.uuid
      },
      data: {
        token: accessToken
      }
    })

    return {
      status: 200,
      accessToken: accessToken
    };
  }

  async register(registerDTO: RegisterDTO) {
    const { email, password } = registerDTO;

    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: email
      }
    })

    if (existingUser) {
      throw new ConflictException(`User with email ${email} already exists`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    registerDTO.password = hashedPassword;

    const createUser = await this.prisma.user.create({
      data: registerDTO
    })

    return {
      status: 201,
      data: createUser
    }
  }
}