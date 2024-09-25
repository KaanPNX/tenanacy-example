import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Role } from "./entites/Roles.entity";
import { RolesService } from "./service/roles.service";
import { RolesController } from "./controller/roles.controller";


@Module({
    imports: [TypeOrmModule.forFeature([Role])],
    providers: [RolesService],
    exports: [RolesService],
    controllers: [RolesController]
})
export class RolesModule {}