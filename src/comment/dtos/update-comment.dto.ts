import { Transform } from 'class-transformer';
import { IsString, IsUUID } from 'class-validator';
import { COMMENT_STATUS } from '../types/comment.type';

export class UpdateCommentDto {
  @IsString()
  @IsUUID()
  id: string;

  @IsString()
  description: string;

  @Transform(({ value }) =>
    value !== COMMENT_STATUS.PRIVATE
      ? COMMENT_STATUS.PUBLIC
      : COMMENT_STATUS.PRIVATE,
  )
  status: COMMENT_STATUS;
}
