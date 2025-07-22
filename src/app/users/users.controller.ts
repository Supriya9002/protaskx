import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AppLogger } from '@common/service/logger.service';
import { UsersService } from './users.service';
import { LoginUserDto } from './dto/login-user-dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly UsersService: UsersService,
    private readonly logger: AppLogger,
  ) {}

  //Register
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    this.logger.log(
      `User registered: ${createUserDto.fullName} - ${createUserDto.email}`,
    );
    return await this.UsersService.create(createUserDto);
  }

  //Login
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.UsersService.login(loginUserDto);
  }
}
