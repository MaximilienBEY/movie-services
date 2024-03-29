import { Controller, Get } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"

import { CategoryService } from "./category.service"

@ApiTags("Categories")
@Controller("categories")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  findAll() {
    return this.categoryService.findAll()
  }

  @Get(":id/movies")
  getMoviesByCategory(id: string) {
    return this.categoryService.getMoviesByCategory(id)
  }
}
