import { IsEmail, IsNumber, IsString } from 'class-validator';

export class LoginDto {
  @IsNumber()
  companyCode: number;
  @IsNumber()
  userCode: number;

  @IsString()
  password: string;
}
