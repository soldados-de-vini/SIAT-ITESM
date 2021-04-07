import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './users/users.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    entities: [UsersEntity]
  })],
})
export class AppModule {}
