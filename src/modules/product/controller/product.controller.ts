import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from "@nestjs/common";
import { ProductService } from "../service/product.service";
import { Product } from "../entities/product.entity";
import { AuthGuard } from "@nestjs/passport";
import * as express from "express";
import { JwtAuthGuard } from "../../auth/guards/JwtAuth.guard";
import { RolesGuard } from "../../auth/guards/Roles.guard";
import { Roles } from "../../auth/decorators/Roles.decorator";
import { RoleDefinations } from "../../../../commons/RoleDefinations";

@Controller('product')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    @Roles(RoleDefinations.PRODUCT_READ, RoleDefinations.ADMIN)
    async findAll(@Request() req: express.Request): Promise<any> {
        return this.productService.findAll(req);
    }

    @Get(':id')
    @Roles(RoleDefinations.PRODUCT_READ, RoleDefinations.ADMIN)
    async findOne(@Request() req: express.Request, @Param('id') id: string): Promise<any> {
        return this.productService.findOne(req, id);
    }

    @Post()
    @Roles(RoleDefinations.PRODUCT_CREATE, RoleDefinations.ADMIN)
    async create(@Request() req: express.Request, @Body() product: Product): Promise<any> {
        return this.productService.create(req, product);
    }

    @Put(':id')
    @Roles(RoleDefinations.PRODUCT_UPDATE, RoleDefinations.ADMIN)
    async update(@Request() req: express.Request, @Param('id') id: string, @Body() product: Product): Promise<any> {
        return this.productService.update(req, id, product);
    }

    @Delete(':id')
    @Roles(RoleDefinations.PRODUCT_DELETE, RoleDefinations.ADMIN)
    async delete(@Request() req: express.Request, @Param('id') id: string): Promise<any> {
        return this.productService.delete(req, id);
    }   
}