import { BoardModule } from './../board/board.module';
import { BoardService } from './../board/board.service';
import { User } from './../user/entities/user.entities';
import { UserService } from './../user/user.service';
import { UserModule } from '../user/user.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { Comment } from './entities/comment.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User]), BoardModule],
  controllers: [CommentController],
  providers: [CommentService, BoardService],
  exports: [TypeOrmModule, CommentService],
})
export class CommentModule {}
