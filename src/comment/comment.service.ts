import { BoardService } from './../board/board.service';
import { COMMENT_STATUS } from './types/comment.type';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entities';
import { Repository, UpdateResult } from 'typeorm';
import { ResponseCommentDto } from './dtos/response-comment.dto';
import { Comment } from './entities/comment.entities';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Board } from '../board/entities/board.entities';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    private boardService: BoardService,
  ) {}

  /**
   *
   * @param commentId id of comment
   * @param userId id of user
   * @returns comment entity
   */
  async getComment(
    commentId: string,
    userId: string,
  ): Promise<ResponseCommentDto> {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
    });

    const isShown = this.isShown(comment, userId);
    if (!isShown) {
      comment.description = null;
    }

    return comment;
  }

  private isShown(comment: Comment, userId: string) {
    return (
      comment.status === COMMENT_STATUS.PUBLIC || userId === comment.authorId
    );
  }

  async createComment(userId: string, dto: CreateCommentDto): Promise<Comment> {
    const comment = this.commentRepository.create({
      authorId: userId,
      ...dto,
    });

    return await this.commentRepository.save(comment);
  }

  async getAllCommentsOnBoard(
    userId: string,
    boardId: number,
    options: IPaginationOptions,
  ) {
    const queryBuilder = this.commentRepository
      .createQueryBuilder('comment')
      .where(`comment.boardId = :boardId`, { boardId })
      .orderBy('comment.createdAt', 'DESC');

    const paginatedComments = await paginate<Comment>(queryBuilder, options);

    const board = await this.boardService.getBoardById(boardId);
    const isAuthor = this.isAuthor(userId, board);
    if (isAuthor) return paginatedComments;

    const items = paginatedComments.items.map((comment) =>
      this.isShown(comment, userId)
        ? comment
        : { description: null, ...comment },
    );

    return {
      ...paginatedComments,
      items,
    };
  }

  private isAuthor(userId: string, board: Board) {
    return board.authorId === userId;
  }

  /**
   *
   * @param user user entity
   * @param commentId id of comment
   * @returns failed throws BadRequestException, success returns UpdateResult
   */
  async deleteComment(user: User, commentId: string): Promise<UpdateResult> {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
    });

    if (!comment)
      throw new BadRequestException(`Can not find comment by id ${commentId}`);

    if (user.id !== comment.authorId)
      throw new BadRequestException(
        `Can not delete comment by user ${user.username}`,
      );

    return await this.commentRepository.softDelete(comment.id);
  }
}
