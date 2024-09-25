import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { Role } from "../../roles/entites/Roles.entity";
import { ValidateNested } from "class-validator";
export class UpdateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    code: number;

    @IsString()
    @IsNotEmpty()
    company: string;

    @IsArray()
    @ValidateNested({ each: true })
    roles: Role[];

}