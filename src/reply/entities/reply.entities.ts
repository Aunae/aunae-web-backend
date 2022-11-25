import { User } from './../../user/entities/user.entities';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseTimeEntity } from 'src/common/entities/baseTime.entity';

/**
 * 질문에 대한 답변 table입니다. 답변에 대한 코멘트가 있을 수 있습니다.
 */
@Entity({ name: 'reply' })
export class Reply extends BaseTimeEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsString()
  @ApiProperty({ description: 'id' })
  id: string;

  @Column()
  description: string;

  @JoinColumn({ name: 'authorId', referencedColumnName: 'id' })
  @ManyToOne(() => User, (user) => user.replies)
  author: User;

  /**
   * 단방향 ManyToMany
   */
  @JoinColumn({ name: 'authorId', referencedColumnName: 'id' })
  @ManyToMany(() => User)
  @ApiProperty({ description: '추천수' })
  likes: User[];

  comments: Comment[];
}
