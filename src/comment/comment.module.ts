import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from 'src/board/entities/board.entities';
import { User } from 'src/user/entities/user.entities';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { Comment } from './entities/comment.entities';

@Module({
  imports: [TypeOrmModule.forFeature([User, Comment, Board])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
