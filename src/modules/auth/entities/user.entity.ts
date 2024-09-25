import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Entity,
  Column,
  Unique,
  OneToMany,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { Company } from '../../company/company.entity';
import * as bcrypt from 'bcrypt';
import { Role } from '../../roles/entites/Roles.entity';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({ unique: true })
  code: number;

  @Column({ nullable: true })
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  
  @ManyToOne(() => Company, company => company.users, {eager: true})
  company: Company;

  @ManyToMany(() => Role, (role) => role.users,{eager: true})
  roles: Role[];

  async validatePassword(password: string): Promise<boolean> {
    if(password === null || password === undefined || password === ''){
      return false;
    }
    const hash = await bcrypt.compare(password, this.password);
    return hash;
  }
}
