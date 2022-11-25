import { CreateReplyDto } from './dtos/create-reply.dto';
import { Board } from './../board/entities/board.entities';
import { Reply } from './entities/reply.entities';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ReplyService {
  constructor(
    @InjectRepository(Reply) private replyRepository: Repository<Reply>,
    @InjectRepository(Board) private boardRepository: Repository<Board>,
  ) {}

  async getReplyById(id: string): Promise<Reply> {
    const reply = await this.replyRepository.findOne({ where: { id } });
    if (!reply) throw new BadRequestException('댓글을 찾을 수 없습니다.');
    return reply;
  }

  async deleteReplyById(userId: string, replyId: string) {
    const reply = await this.getReplyById(replyId);
    if (reply.authorId !== userId) {
      throw new BadRequestException('댓글 삭제 권한이 없습니다.');
    } else {
      const result = await this.replyRepository.softRemove(reply);
      return result;
    }
  }

  async getRepliesOnBoard(boardId: string): Promise<Reply[]> {
    const board = await this.boardRepository.findOne({
      where: { id: boardId },
      relations: ['replies'],
    });
    if (!board) throw new BadRequestException('글을 찾을 수 없습니다.');
    return board.replies;
  }

  async replyOnBoard(
    userId: string,
    createReplyDto: CreateReplyDto,
  ): Promise<Reply> {
    const reply = this.replyRepository.create({
      id: userId,
      ...createReplyDto,
    });
    return await this.replyRepository.save(reply);
  }
}
