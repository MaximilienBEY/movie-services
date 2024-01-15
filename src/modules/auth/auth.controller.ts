import { Body, Controller, Get, Patch, Post } from "@nestjs/common"
import { ApiOkResponse, ApiTags } from "@nestjs/swagger"
import { Throttle } from "@nestjs/throttler"
import { zodToOpenAPI } from "nestjs-zod"
import { Public, User } from "src/decorators/user.decorator"
import { authResponseSchema, tokensSchema } from "src/schemas/auth/schema"
import { UserType } from "src/schemas/user/types"

import { AuthService } from "./auth.service"
import { LoginDto } from "./dto/login.dto"
import { RefreshDto } from "./dto/refresh.dto"
import { RegisterDto } from "./dto/register.dto"
import { UpdateMeDto } from "./dto/update-me.dto"

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Throttle({ default: { ttl: 60 * 1000, limit: 5 } }) // 5 requests per minute
  @Post("login")
  @ApiOkResponse({ schema: zodToOpenAPI(authResponseSchema) })
  async login(@Body() { email, password }: LoginDto) {
    return this.authService.loginUser(email, password)
  }

  @Post("register")
  @Throttle({ default: { ttl: 60 * 1000, limit: 5 } }) // 5 requests per minute
  @Public()
  @ApiOkResponse({ schema: zodToOpenAPI(authResponseSchema) })
  async register(@Body() body: RegisterDto) {
    return this.authService.registerUser(body)
  }

  @Public()
  @Throttle({ default: { ttl: 60 * 1000, limit: 5 } }) // 5 requests per minute
  @Post("refresh")
  @ApiOkResponse({ schema: zodToOpenAPI(tokensSchema) })
  async refresh(@Body() { token }: RefreshDto) {
    return this.authService.refreshToken(token)
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
