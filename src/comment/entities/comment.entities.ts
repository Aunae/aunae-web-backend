import { ApiProperty } from '@nestjs/swagger';
import { Board } from 'src/board/entities/board.entities';
import { User } from 'src/user/entities/user.entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseTimeEntity } from '../../common/entities/baseTime.entity';
import { COMMENT_STATUS } from '../types/comment.type';

@Entity({ name: 'comment' })
export class Comment extends BaseTimeEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'id' })
  id: string;

  @Column()
  @ApiProperty({ description: '댓글 내용' })
  description: string;

  @Column({ default: COMMENT_STATUS.PUBLIC })
  @ApiProperty({ description: '공개 비공개' })
  status: COMMENT_STATUS;

  @Column({ name: 'authorId' })
  authorId: string;

  @JoinColumn({ name: 'authorId', referencedColumnName: 'id' })
  @ManyToOne(() => User, (user) => user.comments)
  @ApiProperty({ description: '작성자' })
  author: User;

  @Column({ name: 'boardId' })
  boardId: number;

  @JoinColumn({ name: 'boardId', referencedColumnName: 'id' })
  @ManyToOne(() => Board, (board) => board.comments)
  board: Board;

  @Column({ name: 'parentId', default: null })
  parentId?: string;

  @ManyToOne(() => Comment, (comment) => comment.children)
  @ApiProperty({ description: '부모 댓글' })
  parent?: Comment;

  @JoinColumn({ name: 'parentId', referencedColumnName: 'id' })
  @OneToMany(() => Comment, (comment) => comment.parent)
  @ApiProperty({ description: '자식 댓글' })
  children?: Comment[];
}
