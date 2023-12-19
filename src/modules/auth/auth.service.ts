import { BadRequestException, Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import * as bcrypt from "bcrypt"
import { PrismaService } from "src/prisma/prisma.service"
import {
  LoginResponseType,
  RegisterResponseType,
  RegisterType,
  UserMeUpdateType,
} from "src/schemas/auth/types"
import { generateToken } from "src/utils/token"

import { UserService } from "../user/user.service"

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  private async generateToken(userId: string) {
    const token = generateToken(32)
    await this.prisma.token.create({ data: { token, userId } })

    return this.jwtService.signAsync({ sub: token }, { expiresIn: "30d" })
  }

  async decodeToken(token: string) {
    try {
      const payload = this.jwtService.verify(token)
      return payload
    } catch (error) {
      return null
    }
  }

  async loginUser(email: string, password: string): Promise<LoginResponseType> {
    const user = await this.userService.findOneByEmail(email)
    if (!user) throw new BadRequestException("Invalid credentials")

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) throw new BadRequestException("Invalid credentials")

    const token = await this.generateToken(user.id)
    return { token }
  }

  async registerUser(data: RegisterType): Promise<RegisterResponseType> {
    const user = await this.userService.create({ ...data, role: "USER" })
    const token = await this.generateToken(user.id)

    return { user, token }
  }

  async updateUser(userId: string, data: UserMeUpdateType) {
    return this.userService.update(userId, data)
  }
}
