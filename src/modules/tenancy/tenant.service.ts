import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { DataSource, DataSourceOptions } from 'typeorm';
import { createConnection } from 'typeorm';
import { Product } from '../product/entities/product.entity';


const {
    TYPEORM_HOST,
    TYPEORM_USERNAME,
    TYPEORM_PASSWORD,
    TYPEORM_DATABASE,
    TYPEORM_PORT,
  } = process.env;

export class TenantService {
  private connections: Map<string, DataSource> = new Map();
  constructor() {
  }


  async getConnection(companyCode: string): Promise<DataSource> {
    if (this.connections.has(companyCode)) {
      return this.connections.get(companyCode);
    }

    const connection = new DataSource({
        type: 'mysql',
        host: TYPEORM_HOST,
        port: parseInt(TYPEORM_PORT),
        username: TYPEORM_USERNAME,
        password: TYPEORM_PASSWORD,
        database: companyCode,
        logging: process.env.TYPEORM_LOGGING === 'true' ? true : false,
        entities: [Product],
        synchronize: true,  
    });

    this.connections.set(companyCode, await connection.initialize());
    return connection;
  }
}
