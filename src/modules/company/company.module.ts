import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { Company } from './company.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyController } from './company.controller';
import dataSource from '../../../dataSource';

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  providers: [CompanyService],
  exports: [CompanyService],
  controllers: [CompanyController], 
})
export class CompanyModule {}