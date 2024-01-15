import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common"
import { User } from "@prisma/client"
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
  public formatUser(u: User): UserType {
    const user: UserType & { password?: string } = { ...u }
    delete user.password

    return user
  }

  async findAll(): Promise<UserType[]> {
    return this.prisma.user.findMany({
      select: selectedFields,
    })
  }
  async findOne(id: string) {
    return this.prisma.user
      .findFirstOrThrow({
        where: { id },
        select: selectedFields,
      })
      .catch(() => {
        throw new NotFoundException("User not found")
      })
  }
  async findOneByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findFirst({ where: { email } })
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
  async update(id: string, body: UserUpdateType) {
    const hashedPassword = body.password ? await this.hashPassword(body.password) : undefined
    return this.prisma.user.update({
      where: { id },
      data: { ...body, ...(hashedPassword && { password: hashedPassword }) },
      select: selectedFields,
    })
  }
  async remove(id: string) {
    return this.prisma.user.delete({ where: { id } }).catch(() => {
      throw new NotFoundException("User not found")
    })
  }
}
