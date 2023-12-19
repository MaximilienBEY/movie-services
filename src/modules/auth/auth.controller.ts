import { Body, Controller, Get, Patch, Post } from "@nestjs/common"
import { ApiOkResponse } from "@nestjs/swagger"
import { Throttle } from "@nestjs/throttler"
import { zodToOpenAPI } from "nestjs-zod"
import { Public, User } from "src/decorators/user.decorator"
import { loginResponseSchema, registerResponseSchema } from "src/schemas/auth/schema"
import { UserType } from "src/schemas/user/types"

import { AuthService } from "./auth.service"
import { LoginDto } from "./dto/login.dto"
import { RegisterDto } from "./dto/register.dto"
import { UpdateMeDto } from "./dto/update-me.dto"

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Throttle({ default: { ttl: 60 * 1000, limit: 5 } }) // 5 requests per minute
  @Post("login")
  @ApiOkResponse({ schema: zodToOpenAPI(loginResponseSchema) })
  async login(@Body() { email, password }: LoginDto) {
    return this.authService.loginUser(email, password)
  }

  @Post("register")
  @Public()
  @ApiOkResponse({ schema: zodToOpenAPI(registerResponseSchema) })
  async register(@Body() body: RegisterDto) {
    return this.authService.registerUser(body)
  }

  @Get("me")
  async me(@User() user: UserType) {
    return user
  }

  @Patch("me")
  async updateMe(@User() user: UserType, @Body() body: UpdateMeDto) {
    return this.authService.updateUser(user.id, body)
  }
}
