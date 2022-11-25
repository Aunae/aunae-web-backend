import { User } from './../user/entities/user.entities';
import { UserService } from './../user/user.service';
import { UserModule } from '../user/user.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { Comment } from './entities/comment.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User]), UserModule],
  controllers: [CommentController],
  providers: [CommentService, UserService],
  exports: [TypeOrmModule, CommentService],
})
export class CommentModule {}
