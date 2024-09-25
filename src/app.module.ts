import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from './modules/auth/auth.module';

import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { CompanyModule } from './modules/company/company.module';
import { User } from './modules/auth/entities/user.entity';
import { Company } from './modules/company/company.entity';
import path = require('path');
import { ProductModule } from './modules/product/product.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './modules/auth/strategies/jwt.strategy';
import { TenantModule } from './modules/tenancy/tenant.module';
import { RolesModule } from './modules/roles/roles.module';
import { WebsocketModule } from './websocket/websocket.module';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const {
  TYPEORM_HOST,
  TYPEORM_USERNAME,
  TYPEORM_PASSWORD,
  TYPEORM_DATABASE,
  TYPEORM_PORT,
} = process.env;

@Module({
  imports: [

    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: TYPEORM_HOST,
      port: parseInt(TYPEORM_PORT),
      username: TYPEORM_USERNAME,
      password: TYPEORM_PASSWORD,
      database: TYPEORM_DATABASE,
      logging: process.env.TYPEORM_LOGGING === 'true' ? true : false,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
    }),

    TenantModule,AuthModule, CompanyModule, ProductModule,RolesModule, WebsocketModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    }
  ],
})
export class AppModule { }
