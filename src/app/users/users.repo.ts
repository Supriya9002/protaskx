import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User, UserDocument } from './users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user-dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    if (await this.userModel.exists({ email: user.email })) {
      //   throw new Error('Email already exists');
      //  throw new ConflictException('User already exists with this email');
      throw new ConflictException({
        message: 'Email already registered',
        errorCode: 'USER_EXISTS',
      });
    }
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = await this.userModel.create({
      ...user,
      password: hashedPassword,
    });
    return newUser;
  }

  // login
  async login(loginUserDto: LoginUserDto) {
    const user = await this.userModel
      .findOne({
        email: loginUserDto.email.toLowerCase(),
      })
      .select('+password'); // include only for internal comparison

    if (!user) {
      throw new NotFoundException({
        message: 'Email does not exist',
        errorCode: 'EMAIL_NOT_FOUND',
      });
    }

    const isPasswordValid = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException({
        message: 'Invalid password',
        errorCode: 'INVALID_PASSWORD',
      });
    }

    const { password, ...safeUser } = user.toObject();
    return {
      message: 'Login successful',
      data: safeUser,
    };
  }
}
