import { CreateBoardDto } from './dtos/create-board.dto';
import { Board } from './entities/board.entities';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board) private boardRepository: Repository<Board>,
  ) {}

  async getBoardById(id: number): Promise<Board> {
    const board = await this.boardRepository.findOne({ where: { id } });
    if (!board) throw new BadRequestException('게시글을 찾을 수 없습니다.');

    return board;
  }

  async createBoad(authorId: string, dto: CreateBoardDto): Promise<Board> {
    const board = this.boardRepository.create({ authorId, ...dto });
    if (!board) throw new BadRequestException('게시글을 만들 수 없습니다.');
    const result = await this.boardRepository.save(board);
    return result;
  }
}
