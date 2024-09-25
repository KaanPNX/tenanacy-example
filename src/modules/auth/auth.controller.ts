import { Body, Controller, Param, Post, Put, Request } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { SignupDto } from './dto/signup.dto';
import { User } from './entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { UserJwtResponse } from './interfaces/user-jwt.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './services/user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto): Promise<User> {
    return this.authService.signUp(signupDto);
  }

  @Put('login')
  async login(@Body() loginDto: LoginDto): Promise<UserJwtResponse> {
    return this.authService.login(loginDto);
  }

  @Post('refreshtoken')
  async refreshToken(@Request() req: Express.Request): Promise<object> {
    return this.authService.refreshToken(req);
  }
}
