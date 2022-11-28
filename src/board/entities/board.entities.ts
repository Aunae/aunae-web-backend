import { Reply } from './../../reply/entities/reply.entities';
import { Comment } from 'src/comment/entities/comment.entities';
import { User } from 'src/user/entities/user.entities';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { BaseTimeEntity } from '../../common/entities/baseTime.entity';

@Entity()
export class Board extends BaseTimeEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @Column({ default: null })
  thumbnail?: string | null;

  @Column()
  description: string;

  @Column({ default: 0 })
  viewCount: number;

  @Column({ name: 'authorId' })
  authorId: string;

  @JoinColumn({ name: 'authorId', referencedColumnName: 'id' })
  @ManyToOne(() => User, (user) => user.boards)
  author: User;

  @OneToMany(() => Comment, (comment) => comment.board)
  comments: Comment[];

  @OneToMany(() => Reply, (reply) => reply.board)
  replies: Reply[];
}
