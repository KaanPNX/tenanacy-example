import { Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./services/user.service";
import { User } from "./entities/user.entity";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Param, Body, Put } from "@nestjs/common";

@Controller('users')
export class UserController {
    constructor( private readonly userService : UserService){}
    
    @Get(':id')
    async getUser(@Param('id') id: string): Promise<User> {
        return this.userService.findById(id);
    }

    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() user: UpdateUserDto): Promise<User> {
        return this.userService.updateUser(id, user);
    }
}