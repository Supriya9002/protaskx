import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repo';
import { LoginUserDto } from './dto/login-user-dto';

@Injectable()
export class UsersService {
  constructor(private readonly UsersRepository: UsersRepository) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.UsersRepository.create(createUserDto);
    return {
      message: 'User registered successfully',
      data: user,
    };
  }

  //login
  async login (loginUserDto: LoginUserDto) {
    const user = await this.UsersRepository.login(loginUserDto);
    return {
      message: 'User logged in successfully',
      data: user,
    };
  }
}
