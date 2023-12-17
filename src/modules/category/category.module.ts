import { Module } from "@nestjs/common"

import { MovieModule } from "../movie/movie.module"
import { CategoryController } from "./category.controller"
import { CategoryService } from "./category.service"

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  imports: [MovieModule],
})
export class CategoryModule {}
