import { BoardModule } from './../board/board.module';
import { Reply } from './entities/reply.entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ReplyController } from './reply.controller';
import { ReplyService } from './reply.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reply]), BoardModule],
  controllers: [ReplyController],
  providers: [ReplyService],
  exports: [TypeOrmModule],
})
export class ReplyModule {}
