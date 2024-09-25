import { Inject, Injectable, Request, Scope } from "@nestjs/common";
import { Repository } from "typeorm";
import { Product } from "../entities/product.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { TenantService } from "../../tenancy/tenant.service";
import { REQUEST } from "@nestjs/core";

@Injectable()
export class ProductService {
    constructor(
        private readonly tenantService: TenantService
    ) {

    }

    async getTenancyConnection(req : Express.Request) {
        var user : any = req.user;
        return (await this.tenantService.getConnection(user.company.code.toString())).getRepository(Product);
    }

    async findAll(@Request() req : Express.Request) {
        const connection = await this.getTenancyConnection(req);
        return connection.find();
    }

    async findOne(@Request() req : Express.Request, id: string) {
        const connection = await this.getTenancyConnection(req);
        return connection.findOne({where: {id: id}});
    }

    async create(@Request() req : Express.Request, product: Product) {
        const connection = await this.getTenancyConnection(req);
        return connection.save(product);
    }

    async update(@Request() req : Express.Request, id: string, product: Product) {
        const connection = await this.getTenancyConnection(req);
        return connection.update(id, product);
    }

    async delete(@Request() req : Express.Request, id: string) {
        const connection = await this.getTenancyConnection(req);
        return connection.delete(id);
    }

}   