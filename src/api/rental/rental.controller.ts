import { Controller, Body, Post, Get, Delete, Patch, UseGuards } from '@nestjs/common';
import { RentalService } from './rental.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RentalDTO } from './dto/rental.dto';
import { RentalEntity } from './entity/rental.entity';
import { JwtAuthGuard } from 'src/lib/jwt.guard';

@Controller("rental")
@ApiTags("rental")
export class RentalController {
  constructor(private readonly rentalService: RentalService) { }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiCreatedResponse({ type: RentalEntity })
  async createRental(@Body() data: RentalDTO) {
    return await this.rentalService.createRental(data);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOkResponse({ type: RentalEntity })
  async getAllRental() {
    return await this.rentalService.getAllRental();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(":id")
  @ApiOkResponse({ type: RentalEntity })
  async getRentalById(@Body() id: number) {
    return await this.rentalService.getRentalById(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch()
  @ApiOkResponse({ type: RentalEntity })
  async updateRental(@Body() id: number, data: RentalDTO) {
    return await this.rentalService.updateRental(id, data);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete()
  @ApiOkResponse({ type: RentalEntity })
  async deleteRental(@Body() id: number) {
    return await this.rentalService.deleteRental(id);
  }
}