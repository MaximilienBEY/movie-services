import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common"
import * as bcrypt from "bcrypt"
import { PrismaService } from "src/prisma/prisma.service"
import { UserCreateType, UserType, UserUpdateType } from "src/schemas/user/types"

const selectedFields = {
  id: true,
  email: true,
  name: true,
  role: true,
  createdAt: true,
  updatedAt: true,
}

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  private async hashPassword(password: string) {
    return bcrypt.hash(password, 10)
  }

  async create(body: UserCreateType) {
    const hashedPassword = await this.hashPassword(body.password)
    return this.prisma.user
      .create({
        data: { ...body, password: hashedPassword },
        select: selectedFields,
      })
      .catch(() => {
        throw new BadRequestException("Email already used")
      })
  }

  findAll(): Promise<UserType[]> {
    return this.prisma.user.findMany({
      select: selectedFields,
    })
  }

  findOne(id: string) {
    return this.prisma.user
      .findFirstOrThrow({
        where: { id },
        select: selectedFields,
      })
      .catch(() => {
        throw new NotFoundException("User not found")
      })
  }
  findOneByEmail(email: string) {
    return this.prisma.user.findFirst({ where: { email } })
  }
  findOneByToken(token: string) {
    return this.prisma.user.findFirst({
      select: selectedFields,
      where: { tokens: { some: { token } } },
    })
  }

  async update(id: string, body: UserUpdateType) {
    const hashedPassword = body.password ? await this.hashPassword(body.password) : undefined
    return this.prisma.user.update({
      where: { id },
      data: { ...body, ...(hashedPassword && { password: hashedPassword }) },
      select: selectedFields,
    })
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id } }).catch(() => {
      throw new NotFoundException("User not found")
    })
  }
}
