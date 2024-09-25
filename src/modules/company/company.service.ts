import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '../auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from '../auth/dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../auth/dto/login.dto';
import { LoginResponseDto } from '../auth/dto/loginResponse.dto';
import { Repository,DataSource } from 'typeorm';
import { Company } from './company.entity';
import { CreateCompanyDto } from './create-company.dto';
import path = require('path');
const {
  TYPEORM_HOST,
  TYPEORM_USERNAME,
  TYPEORM_PASSWORD,
  TYPEORM_DATABASE,
  TYPEORM_PORT,
} = process.env;

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    private dataSource: DataSource,  // Ana veritabanı bağlantısı

  ) {}

  findById(id: string): Promise<Company> {
    return this.companyRepository.findOne({ where: { id } });
  }

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const { code, name, address, phone, email, website, industry, numberOfEmployees, revenue, description, taxOffice, taxNumber } = createCompanyDto;
    const checkCompany = await this.companyRepository.findOne({ where: { code: code } });
    if(checkCompany){
      throw new BadRequestException('Company already exists');
    }
    const company = new Company();
    company.code = code || 0;
    company.name = name || '';
    company.address = address || '' ;
    company.phone = phone || '';
    company.email = email || '';
    company.website = website || '';
    company.industry = industry || '';
    company.numberOfEmployees = numberOfEmployees || 0;
    company.revenue = revenue || 0;
    company.description = description || '';
    company.taxOffice = taxOffice || '';
    company.taxNumber = taxNumber || '';

    try {
      await company.save();
      const queryRunner = await this.dataSource.createQueryRunner();
      await queryRunner.connect();

      await queryRunner.createDatabase(company.code.toString(), true);
      await queryRunner.release();
      
      return company;
    } catch (error) {
      throw error;
    }
  }

}
