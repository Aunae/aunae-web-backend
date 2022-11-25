import { CommentService } from './../comment/comment.service';
import { CommentModule } from './../comment/comment.module';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entities';
import { UserAct } from './entities/user-act.entities';
import { Comment } from 'src/comment/entities/comment.entities';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserAct, Comment])],
  providers: [UserService],
  controllers: [UserController],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
