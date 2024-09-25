import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { SignupDto } from '../dto/signup.dto';
import { User } from '../entities/user.entity';
import { UserJwtResponse } from '../interfaces/user-jwt.interface';
import { LoginDto } from '../dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUserById(userId: string) : Promise<User> {
    return await this.userService.findById(userId);
  }

  async signUp(signupDto: SignupDto): Promise<User> {
    const user = await this.userService.checkUser(signupDto);
    if (user) {
      throw new ConflictException('User already exists');
    }
    
  
    return this.userService.create(signupDto);
  }

  async login(loginDto: LoginDto): Promise<UserJwtResponse> {
    const userResult = await this.userService.signIn(loginDto);

    if (!userResult) {
      throw new UnauthorizedException('Invalid Credentials!');
    }

    const payload = { userResult };
    const accessToken = await this.jwtService.sign(payload);

    const signInResponse: UserJwtResponse = { user: userResult, accessToken };

    return signInResponse;
  }

  async refreshToken(req: Express.Request): Promise<object> {
    const user = req.user;
    const payload = { user };
    const accessToken = await this.jwtService.sign(payload);
    const refreshToken = await this.jwtService.sign(payload, { expiresIn: '7d' });
    return { accessToken, refreshToken };
  }
}
