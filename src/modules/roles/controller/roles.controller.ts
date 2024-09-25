import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { RolesService } from "../service/roles.service";
import { Role } from "../entites/Roles.entity";
import { CreateRoleDto } from "../dto/create-role.dto";
import { UpdateRoleDto } from "../dto/update-role.dto";

@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}
    
    @Get()
    async findAll(): Promise<Role[]> {
        return this.rolesService.findAll();
    }

    @Post()
    async create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
        return this.rolesService.create(createRoleDto);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto): Promise<Role> {
        return this.rolesService.update(id, updateRoleDto);
    }   
}