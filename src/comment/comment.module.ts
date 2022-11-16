import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entities';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { Comment } from './entities/comment.entities';

@Module({
  imports: [TypeOrmModule.forFeature([User, Comment])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentsModule {}
