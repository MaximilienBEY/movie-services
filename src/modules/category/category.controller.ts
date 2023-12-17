import { Controller, Get } from "@nestjs/common"

import { CategoryService } from "./category.service"

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
