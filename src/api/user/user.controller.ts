import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserEntity } from './entity/user.entity';
import { JwtAuthGuard } from 'src/lib/jwt.guard';
import { UpdateUserDTO } from './dto/user-update.dto';

@Controller("user")
@ApiTags("user")
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async findAll() {
    const users = await this.userService.getAllUsers();
    return users.map((user) => new UserEntity(user));
  }

  @Get(':uuid')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async findOne(@Param('uuid') uuid: string) {
    return new UserEntity(await this.userService.getUserById(uuid));
  }

  @Patch(':uuid')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: UserEntity })
  async update(
    @Param('uuid') uuid: string,
    @Body() updateUserDto: UpdateUserDTO,
  ) {
    return new UserEntity(await this.userService.updateUser(uuid, updateUserDto));
  }

  @Delete(':uuid')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async remove(@Param('uuid') uuid: string) {
    return new UserEntity(await this.userService.deleteUser(uuid));
  }
}
