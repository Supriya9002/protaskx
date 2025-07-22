import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users.schema';
import { AppLogger } from '@common/service/logger.service';
import { UsersRepository } from './users.repo';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), 
  ],
  controllers: [UsersController],
  providers: [UsersService, AppLogger, UsersRepository],
})
export class UsersModule {}
