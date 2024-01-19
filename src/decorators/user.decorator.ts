import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
  UseGuards,
} from "@nestjs/common"
import { AdminGuard } from "src/modules/auth/guards/admin.guard"

export const IS_PUBLIC_KEY = "isPublic"
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)

export const User = createParamDecorator((_: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()
  const user = request.user

  return user
})

export const Admin = () => applyDecorators(UseGuards(AdminGuard))
