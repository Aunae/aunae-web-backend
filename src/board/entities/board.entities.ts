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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  thumbnail: string;

  @Column()
  description: string;

  @Column()
  viewCount: number;

  @Column({ name: 'authorId' })
  authorId: string;

  @JoinColumn({ name: 'authorId', referencedColumnName: 'id' })
  @ManyToOne(() => User, (user) => user.boards)
  author: User;

  @OneToMany(() => Comment, (comment) => comment.board)
  comments: Comment[];
}
