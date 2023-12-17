import { NestFactory } from "@nestjs/core"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { patchNestJsSwagger } from "nestjs-zod"

import { AppModule } from "./app.module"
import { XmlInterceptor } from "./xml/xml.interceptor"

async function bootstrap() {
  patchNestJsSwagger()

  const app = await NestFactory.create(AppModule)
  app.useGlobalInterceptors(new XmlInterceptor())

  const config = new DocumentBuilder()
    .setTitle("Movie API")
    .setDescription("The movie API description")
    .setVersion("1.0")
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("swagger", app, document)

  await app.listen(8888)
}
bootstrap()
