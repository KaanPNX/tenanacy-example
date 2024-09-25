import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Role } from "../entites/Roles.entity";
import { CreateRoleDto } from "../dto/create-role.dto";
import { UpdateRoleDto } from "../dto/update-role.dto";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role)
        private readonly rolesRepository: Repository<Role>) {}

    async findAll(): Promise<Role[]> {
        return this.rolesRepository.find();
    }

    async create(createRoleDto: CreateRoleDto): Promise<Role> {
        return this.rolesRepository.save(createRoleDto);
    }

    async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
        const role = await this.rolesRepository.findOneBy({ id });
        if (!role) {
            throw new NotFoundException('Role not found');
        }
        return this.rolesRepository.save({ ...role, ...updateRoleDto });    
    }
}