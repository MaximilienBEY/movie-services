import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { Request } from "express"
import { IS_PUBLIC_KEY } from "src/decorators/user.decorator"

import { UserService } from "../../user/user.service"
import { AuthService } from "../auth.service"

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (isPublic) return true

    const request = context.switchToHttp().getRequest()
    const jwtToken = this.extractTokenFromHeader(request)
    if (!jwtToken) throw new UnauthorizedException()

    const userId = await this.authService.decodeToken(jwtToken).then(token => token?.sub)
    if (!userId) throw new UnauthorizedException()

    const user = await this.userService.findOne(userId).catch(() => null)
    if (!user) throw new UnauthorizedException()

    request.user = user

    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? []
    return type === "Bearer" ? token : undefined
  }
}
