import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';

import { LoginEntity } from './entity/login.entity';
import { RegisterEntity } from './entity/register.entity';

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("login")
  @ApiOkResponse({ type: LoginEntity })
  async login(@Body() { email, password }: LoginDTO) {
    return await this.authService.login(email, password);
  }

  @Post("register")
  @ApiCreatedResponse({ type: RegisterEntity })
  async register(@Body() registerDTO: RegisterDTO) {
    return await this.authService.register(registerDTO);
  }
}