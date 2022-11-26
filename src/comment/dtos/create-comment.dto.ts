import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';
import { IsNull } from 'typeorm';
import { COMMENT_STATUS } from '../types/comment.type';

export class CreateCommentDto {
  @IsNumber()
  @Min(0)
  boardId: number;

  @IsString()
  description: string;

  @Transform(({ value }) =>
    value !== COMMENT_STATUS.PRIVATE
      ? COMMENT_STATUS.PUBLIC
      : COMMENT_STATUS.PRIVATE,
  )
  status: COMMENT_STATUS;

  @IsOptional()
  parentId?: string | null;
}
