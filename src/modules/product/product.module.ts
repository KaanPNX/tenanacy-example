import { Module } from "@nestjs/common";
import { ProductController } from "./controller/product.controller";
import { ProductService } from "./service/product.service";
import { TypeOrmModule ,} from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { Repository } from "typeorm";
import { CompanyModule } from "../company/company.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";
import { TenantModule } from "../tenancy/tenant.module";

@Module({
    imports: [TenantModule,TypeOrmModule.forFeature([Product])],
    providers: [ProductService],
    controllers: [ProductController], 
})
export class ProductModule {}