import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { UploadsModule } from './uploads/uploads.module';
import { RedisService } from './cache/redis/redis.service';
import { CacheModule } from './cache/cache.module';

@Module({
  imports: [AuthModule, UsersModule, TasksModule, UploadsModule, CacheModule],
  controllers: [AppController],
  providers: [AppService, RedisService],
})
export class AppModule {}
