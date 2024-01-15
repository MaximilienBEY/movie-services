import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { APP_GUARD, APP_PIPE } from "@nestjs/core"
import { JwtModule } from "@nestjs/jwt"
import { MulterModule } from "@nestjs/platform-express"
import { ServeStaticModule } from "@nestjs/serve-static"
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler"
import { ZodValidationPipe } from "nestjs-zod"
import { join } from "path"

import { AuthModule } from "./modules/auth/auth.module"
import { AuthGuard } from "./modules/auth/guards/auth.guard"
import { CategoryModule } from "./modules/category/category.module"
import { MovieModule } from "./modules/movie/movie.module"
import { UserModule } from "./modules/user/user.module"
import { PrismaModule } from "./prisma/prisma.module"

@Module({
  imports: [
    ConfigModule.forRoot(),
    MulterModule.register({ dest: join(__dirname, "..", "uploads") }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "uploads"),
      serveRoot: "/static",
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
    }),
    ThrottlerModule.forRoot([{ ttl: 60 * 1000, limit: 100 }]), // 100 requests per minute
    MovieModule,
    PrismaModule,
    CategoryModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    { provide: APP_PIPE, useClass: ZodValidationPipe },
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
