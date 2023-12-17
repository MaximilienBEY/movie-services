import { Injectable, NotFoundException } from "@nestjs/common"
import { randomUUID } from "crypto"
import { writeFile } from "fs/promises"
import { join } from "path"
import { PrismaService } from "src/prisma/prisma.service"
import {
  MovieCreateBodyType,
  MovieListQueryType,
  MovieListResponseType,
  MovieUpdateBodyType,
} from "src/schemas/movie/types"

@Injectable()
export class MovieService {
  constructor(private readonly prisma: PrismaService) {}

  private async saveFile(file: Express.Multer.File, movieId: string) {
    if (!file.mimetype.startsWith("image/")) throw new Error("Invalid file type")

    const id = randomUUID()
    const extension = file.originalname.split(".").pop()
    const fileName = `${id}.${extension}`

    const filePath = join(__dirname, "..", "..", "..", "uploads", fileName)
    await writeFile(filePath, file.buffer)

    await this.prisma.image.deleteMany({ where: { movieId } })
    await this.prisma.image.create({
      data: { id, url: `/static/${fileName}`, movie: { connect: { id: movieId } } },
    })
  }

  async create({ categories, ...data }: MovieCreateBodyType, file?: Express.Multer.File) {
    const movie = await this.prisma.movie.create({
      data: {
        ...data,
        categories: {
          connectOrCreate: categories?.map(name => ({
            where: { name },
            create: { name },
          })),
        },
      },
      include: { categories: true },
    })

    if (file) {
      await this.saveFile(file, movie.id)
      return this.findOne(movie.id)
    } else return movie
  }

  async findAll({ limit, page, query }: MovieListQueryType): Promise<MovieListResponseType> {
    const total = await this.prisma.movie.count({
      ...(query && {
        where: {
          OR: [{ title: { contains: query } }, { description: { contains: query } }],
        },
      }),
    })
    const items = await this.prisma.movie.findMany({
      take: limit,
      skip: (page - 1) * limit,
      ...(query && {
        where: {
          OR: [{ title: { contains: query } }, { description: { contains: query } }],
        },
      }),
    })
    return {
      items,
      total,
      limit,
      page,
      _links: {
        self: `http://localhost:8888/movies?limit=${limit}&page=${page}`,
        ...(page > 1 && {
          prev: `http://localhost:8888/movies?limit=${limit}&page=${page - 1}`,
        }),
        ...(page * limit < total && {
          next: `http://localhost:8888/movies?limit=${limit}&page=${page + 1}`,
        }),
      },
    }
  }

  async findOne(id: string) {
    const movie = await this.prisma.movie.findUnique({
      where: { id },
      include: { categories: true, poster: true },
    })
    if (!movie) throw new NotFoundException("Movie not found")

    return movie
  }

  async update(
    id: string,
    { categories, ...data }: MovieUpdateBodyType,
    file?: Express.Multer.File,
  ) {
    const movie = await this.prisma.movie
      .update({
        where: { id },
        data: {
          ...data,
          categories: {
            connectOrCreate: categories?.map(name => ({
              where: { name },
              create: { name },
            })),
          },
        },
      })
      .catch(() => {
        throw new NotFoundException("Movie not found")
      })
    if (file) {
      await this.saveFile(file, movie.id)
      return this.findOne(movie.id)
    } else return movie
  }

  delete(id: string) {
    return this.prisma.movie.delete({ where: { id } }).catch(() => {
      throw new NotFoundException("Movie not found")
    })
  }

  findAllByCategory(id: string) {
    return this.prisma.movie.findMany({
      where: { categories: { some: { id } } },
    })
  }
}
