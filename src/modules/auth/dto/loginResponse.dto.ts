import { Company } from "../../company/company.entity";
import { Role } from "../../roles/entites/Roles.entity";

export class LoginResponseDto {
  id: string;
  
  code: number;

  username: string;

  email: string;
  company: Company;

  roles: Role[];
}
