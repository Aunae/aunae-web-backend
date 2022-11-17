import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/board/entities/board.entities';
import { User } from 'src/user/entities/user.entities';
import { Repository } from 'typeorm';
import { ResponseCommentDto } from './dtos/response-comment.dto';
import { Comment } from './entities/comment.entities';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    @InjectRepository(Board) private boardRepository: Repository<Board>,
  ) {}

  async getComment(id: string): Promise<ResponseCommentDto> {
    return await this.commentRepository.findOne({ where: { id } });
  }
}
