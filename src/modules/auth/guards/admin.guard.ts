import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { UserType } from "src/schemas/user/types"

@Injectable()
export class AdminGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const user = request.user as UserType

    return user?.role === "ADMIN"
  }
}
