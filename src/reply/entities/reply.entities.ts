import { Board } from './../../board/entities/board.entities';
import { User } from './../../user/entities/user.entities';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseTimeEntity } from 'src/common/entities/baseTime.entity';

/**
 * 질문에 대한 답변 table입니다. 답변에 대한 코멘트가 있을 수 있습니다.
 */
@Entity({ name: 'reply' })
export class Reply extends Board {
  /**
   * 단방향 ManyToMany
   */
  @JoinColumn({ name: 'authorId', referencedColumnName: 'id' })
  @ManyToMany(() => User)
  @ApiProperty({ description: '추천수' })
  likes: User[];

  @ManyToOne(() => Board, (board) => board.replies)
  board: Board;
}
