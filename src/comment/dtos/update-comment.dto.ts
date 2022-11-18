import { COMMENT_STATUS } from './../entities/comment.entities';
import { Transform } from 'class-transformer';
import { IsOptional, IsString, IsUUID } from 'class-validator';

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
