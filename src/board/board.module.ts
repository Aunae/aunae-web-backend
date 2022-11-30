import { CommentService } from './../comment/comment.service';
import { BoardController } from './board.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entities';
import { UserModule } from '../user/user.module';
import { BoardService } from './board.service';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Board])],
  exports: [TypeOrmModule, BoardService],
  providers: [BoardService, CommentService],
  controllers: [BoardController],
})
export class BoardModule {}
