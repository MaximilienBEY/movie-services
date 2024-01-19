import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common"
import { ApiOkResponse, ApiTags } from "@nestjs/swagger"
import { zodToOpenAPI } from "nestjs-zod"
import { Admin } from "src/decorators/user.decorator"
import { successResponseSchema } from "src/schemas/basic/schema"
import { userSchema, usersSchema } from "src/schemas/user/schema"

import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"
import { UserService } from "./user.service"

@Admin()
@ApiTags("Users")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOkResponse({ description: "User created successfully", schema: zodToOpenAPI(userSchema) })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @Get()
  @ApiOkResponse({ description: "Users found successfully", schema: zodToOpenAPI(usersSchema) })
  findAll() {
    return this.userService.findAll()
  }

  @Get(":id")
  @ApiOkResponse({ description: "User found successfully", schema: zodToOpenAPI(userSchema) })
  findOne(@Param("id") id: string) {
    return this.userService.findOne(id)
  }

  @Patch(":id")
  @ApiOkResponse({ description: "User updated successfully", schema: zodToOpenAPI(userSchema) })
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto)
  }

  @Delete(":id")
  @ApiOkResponse({
    description: "User deleted successfully",
    schema: zodToOpenAPI(successResponseSchema),
  })
  async remove(@Param("id") id: string) {
    await this.userService.remove(id)
    return { message: "User deleted successfully" }
  }
}
