import { Controller, Body, Post, Get, Delete, Patch } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CategoryDTO } from './dto/category.dto';
import { CategoryEntity } from './entity/category.entity';


@Controller("category")
@ApiTags("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post()
  @ApiCreatedResponse({ type: CategoryEntity })
  async createCategory(@Body() data: CategoryDTO) {
    return await this.categoryService.createCategory(data);
  }

  @Get()
  @ApiOkResponse({ type: CategoryEntity })
  async getAllCategory() {
    return await this.categoryService.getAllCategory();
  }

  @Get()
  @ApiOkResponse({ type: CategoryEntity })
  async getCategoryById(@Body() id: number) {
    return await this.categoryService.getCategoryById(id);
  }

  @Patch()
  @ApiOkResponse({ type: CategoryEntity })
  async updateCategory(@Body() id: number, data: CategoryDTO) {
    return await this.categoryService.updateCategory(id, data);
  }

  @Delete()
  @ApiOkResponse({ type: CategoryEntity })
  async deleteCategory(@Body() id: number) {
    return await this.categoryService.deleteCategory(id);
  }
}