import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { APP_PIPE } from "@nestjs/core"
import { MulterModule } from "@nestjs/platform-express"
import { ServeStaticModule } from "@nestjs/serve-static"
import { ZodValidationPipe } from "nestjs-zod"
import { join } from "path"

import { CategoryModule } from "./modules/category/category.module"
import { MovieModule } from "./modules/movie/movie.module"
import { PrismaModule } from "./prisma/prisma.module"

@Module({
  imports: [
    ConfigModule.forRoot(),
    MulterModule.register({ dest: join(__dirname, "..", "uploads") }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "uploads"),
      serveRoot: "/static",
    }),
    MovieModule,
    PrismaModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [{ provide: APP_PIPE, useClass: ZodValidationPipe }],
})
export class AppModule {}
