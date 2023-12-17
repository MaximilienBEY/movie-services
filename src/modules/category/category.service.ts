import { Injectable } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"

import { MovieService } from "../movie/movie.service"

@Injectable()
export class CategoryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly movieService: MovieService,
  ) {}

  async findAll() {
    return this.prisma.category.findMany()
  }

  async getMoviesByCategory(id: string) {
    return this.movieService.findAllByCategory(id)
  }
}
