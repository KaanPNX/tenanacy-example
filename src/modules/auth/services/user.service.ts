import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from '../dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../dto/login.dto';
import { LoginResponseDto } from '../dto/loginResponse.dto';
import { Repository } from 'typeorm';
import { Company } from '../../company/company.entity';
import { UpdateRoleDto } from '../../roles/dto/update-role.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async findById(id: string): Promise<User> {
    return await this.userRepository.findOne({ where: { id : id}, relations: ['company'] });
  }

  public async checkUser(signupDto: SignupDto): Promise<boolean> {
    const { email, code } = signupDto;
    if(await this.userRepository.findOne({where: {email: email}})){
      return true;
    }else if(await this.userRepository.findOne({where: {code: code}})){
      return true;
    }else {
      return false;
    }    
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async create(signupDto: SignupDto, req: Express.Request): Promise<User> {
    var requestUser : any= req.user;
    const { email, password, username, companyId, code } = signupDto;
    if(companyId != requestUser.company.id){
      throw new UnauthorizedException('You are not authorized to create users in this company');
    }

    const user = new User();
    const company = await this.companyRepository.findOne({ where: { id: companyId } });
    user.password = await this.hashPassword(password, await bcrypt.genSalt());
    user.email = email;
    user.username = username;
    user.company = company;
    user.code = code;

    try {
      await user.save();
      return user;
    } catch (error) {
      throw error;
    }
  }

  async signIn(loginDto: LoginDto): Promise<LoginResponseDto> {
    const { userCode, password, companyCode} = loginDto;
    const company = await this.companyRepository.findOne({ where: {code:companyCode} });
    if (company == null) {
      return null;
    }
    const user = await this.userRepository.findOne({ where: {code:userCode, company:{id:company.id}} });
    if (user != null && await user.validatePassword(password)) {
      const userResponse = new LoginResponseDto();

      userResponse.username = user.username;
      userResponse.email = user.email;
      userResponse.code = user.code;
      userResponse.id = user.id;
      userResponse.company = user.company;
      userResponse.roles = user.roles;
      return userResponse;
    } else {
      return null;
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { username, email, password, code, roles } = updateUserDto;
    user.username = username || user.username;
    user.email = email || user.email;
    user.password = password ? await this.hashPassword(password, await bcrypt.genSalt()) : user.password;
    user.code = code || user.code;
    user.roles = roles || user.roles;

    return this.userRepository.save(user); 
  }
}