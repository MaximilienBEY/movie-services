import { BadRequestException, Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import * as bcrypt from "bcrypt"
import { PrismaService } from "src/prisma/prisma.service"
import {
  AuthResponseType,
  AuthTokensType,
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

  private async generateTokens(userId: string): Promise<AuthTokensType> {
    const rToken = generateToken(32)
    const expiredAt = new Date(new Date().getTime() + 1 * 60 * 60 * 1000) // 1 hour
    await this.prisma.refreshToken.create({ data: { token: rToken, expiredAt, userId } })

    const refreshToken = await this.jwtService.signAsync({ sub: rToken }, { expiresIn: "1h" })
    const accessToken = await this.jwtService.signAsync({ sub: userId }, { expiresIn: "5m" })

    return { refreshToken, accessToken }
  }

  async decodeToken(token: string) {
    try {
      const payload = this.jwtService.verify(token)
      return payload
    } catch (error) {
      return null
    }
  }

  async loginUser(email: string, password: string): Promise<AuthResponseType> {
    const user = await this.userService.findOneByEmail(email)
    if (!user) throw new BadRequestException("Invalid credentials")

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) throw new BadRequestException("Invalid credentials")

    const tokens = await this.generateTokens(user.id)
    return { user: this.userService.formatUser(user), tokens }
  }

  async refreshToken(rToken: string): Promise<AuthTokensType> {
    const token = await this.decodeToken(rToken)
    if (!token) throw new BadRequestException("Invalid token")

    const refreshToken = await this.prisma.refreshToken.findFirst({
      where: { token: token.sub as string },
    })
    if (!refreshToken) throw new BadRequestException("Invalid token")

    await this.prisma.refreshToken.delete({ where: { id: refreshToken.id } })
    const tokens = await this.generateTokens(refreshToken.userId)
    return tokens
  }

  async registerUser(data: RegisterType): Promise<AuthResponseType> {
    const user = await this.userService.create({ ...data, role: "USER" })
    const tokens = await this.generateTokens(user.id)

    return { user, tokens }
  }

  async updateUser(userId: string, data: UserMeUpdateType) {
    return this.userService.update(userId, data)
  }
}
