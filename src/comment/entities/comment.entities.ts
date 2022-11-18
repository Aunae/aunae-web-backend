import { ApiProperty } from '@nestjs/swagger';
import { Board } from 'src/board/entities/board.entities';
import { User } from 'src/user/entities/user.entities';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

export const COMMENT_STATUS = {
  PRIVATE: 'PRIVATE',
  PUBLIC: 'PUBLIC',
} as const;
export type COMMENT_STATUS = typeof COMMENT_STATUS[keyof typeof COMMENT_STATUS];

@Entity({ name: 'comment' })
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'id' })
  id: string;

  @Column()
  @ApiProperty({ description: '댓글 내용' })
  description: string;

  @Column()
  @ApiProperty({ description: '공개 비공개' })
  status: COMMENT_STATUS;

  @ManyToOne(() => User, (user) => user.comments)
  @ApiProperty({ description: '작성자' })
  author: User;

  @ManyToOne(() => Board, (board) => board.comments)
  board: Board;

  @OneToMany(() => Comment, (comment) => comment.children)
  @ApiProperty({ description: '부모 댓글' })
  parent: Comment;

  @ManyToOne(() => Comment, (comment) => comment.parent)
  @ApiProperty({ description: '자식 댓글' })
  children: Comment[];

  @CreateDateColumn({ name: 'create_at', comment: '생성일' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at', comment: '수정일' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'delete_at', comment: '삭제일' })
  deletedAt: Date;
}
