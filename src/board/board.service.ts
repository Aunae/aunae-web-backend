import { CreateBoardDto } from './dtos/create-board.dto';
import { Board } from './entities/board.entities';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Pagination,
  IPaginationOptions,
  paginate,
} from 'nestjs-typeorm-paginate';

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

  async getBoardIndex(options: IPaginationOptions): Promise<Pagination<Board>> {
    const queryBuilder = this.boardRepository.createQueryBuilder('b');
    queryBuilder.orderBy('b.createdAt', 'DESC');
    return paginate<Board>(queryBuilder, options);
  }

  async createBoard(authorId: string, dto: CreateBoardDto): Promise<Board> {
    const board = this.boardRepository.create({ authorId, ...dto });
    if (!board) throw new BadRequestException('게시글을 만들 수 없습니다.');
    const result = await this.boardRepository.save(board);
    return result;
  }
}
