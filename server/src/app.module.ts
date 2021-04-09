import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './users/entity/users.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      entities: [UsersEntity],
    }),
    ConfigModule.forRoot(),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
