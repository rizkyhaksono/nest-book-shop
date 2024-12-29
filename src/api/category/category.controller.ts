import { Controller, Body, Post, Get, Delete, Patch, UseGuards, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CategoryDTO } from './dto/category.dto';
import { CategoryEntity } from './entity/category.entity';
import { JwtAuthGuard } from 'src/lib/jwt.guard';

@Controller("category")
@ApiTags("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiCreatedResponse({ type: CategoryEntity })
  async createCategory(@Body() data: CategoryDTO) {
    return await this.categoryService.createCategory(data);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOkResponse({ type: CategoryEntity })
  async getAllCategory() {
    return await this.categoryService.getAllCategory();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(":id")
  @ApiOkResponse({ type: CategoryEntity })
  async getCategoryById(@Param("id") id: string) {
    return await this.categoryService.getCategoryById(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch()
  @ApiOkResponse({ type: CategoryEntity })
  async updateCategory(@Body() id: number, data: CategoryDTO) {
    return await this.categoryService.updateCategory(id, data);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete()
  @ApiOkResponse({ type: CategoryEntity })
  async deleteCategory(@Param("id") id: number) {
    return await this.categoryService.deleteCategory(id);
  }
}