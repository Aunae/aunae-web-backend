import { UpdateCommentDto } from './dtos/update-comment.dto';
import { UserService } from '../user/user.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entities';
import { Repository, UpdateResult } from 'typeorm';
import { ResponseCommentDto } from './dtos/response-comment.dto';
import { Comment } from './entities/comment.entities';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    private userService: UserService,
  ) {}

  /**
   *
   * @param commentId id of comment
   * @returns comment entity
   */
  async getComment(commentId: string, user: User): Promise<ResponseCommentDto> {
    return await this.commentRepository.findOne({ where: { id: commentId } });
  }

  async createComment(userId: string, dto: CreateCommentDto): Promise<Comment> {
    const foundUser = await this.userService.getUser(userId);
    if (!foundUser) {
      throw new BadRequestException('사용자를 찾을 수 없습니다.');
    }

    const comment = this.commentRepository.create({
      authorId: userId,
      ...dto,
    });

    return await this.commentRepository.save(comment);
  }

  /**
   *
   * @param user user entity
   * @param updateCommentDto updateCommentDto
   * @returns fail throws NotFoundException, success returns comment entity
   */
  async updateComment(user: User, updateCommentDto: UpdateCommentDto) {
    const { id, description, status } = updateCommentDto;
    const findUser = await this.userService.getUser(user.id);
    const comment = await this.commentRepository.findOne({ where: { id } });
    if (!comment)
      throw new NotFoundException(`Not found comment by id ${comment}`);

    if (findUser.id !== comment.author.id)
      throw new NotFoundException(
        `Can not update comment by user ${user.username}`,
      );

    comment.description = description;
    comment.status = status;

    return await this.commentRepository.save(comment);
  }

  /**
   *
   * @param user user entity
   * @param commentId id of comment
   * @returns failed throws NotFoundException, success returns UpdateResult
   */
  async deleteComment(user: User, commentId: string): Promise<UpdateResult> {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
    });
    if (!comment)
      throw new NotFoundException(`Can not find comment by id ${commentId}`);
    if (user.id !== comment.author.id)
      throw new NotFoundException(
        `Can not delete comment by user ${user.username}`,
      );

    const result = await this.commentRepository.softDelete(comment.id);
    return result;
  }
}
