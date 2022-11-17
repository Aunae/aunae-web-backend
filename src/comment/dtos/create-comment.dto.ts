import { Transform } from 'class-transformer';
import { IsIn, IsOptional, IsString, IsUUID } from 'class-validator';
import { Comment, COMMENT_STATUS } from '../entities/comment.entities';

export class CreateCommentDto {
  @IsUUID()
  boardId: string;

  @IsString()
  description: string;

  @Transform(({ value }) =>
    value !== COMMENT_STATUS.PRIVATE
      ? COMMENT_STATUS.PUBLIC
      : COMMENT_STATUS.PRIVATE,
  )
  status: COMMENT_STATUS;

  @IsOptional()
  parent?: Comment | null;
}
