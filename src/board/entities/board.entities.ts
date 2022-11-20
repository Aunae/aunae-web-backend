import { Comment } from 'src/comment/entities/comment.entities';
import { User } from 'src/user/entities/user.entities';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.boards)
  author: User;

  @Column()
  title: string;

  @Column()
  thumbnail: string;

  @Column()
  description: string;

  @Column()
  viewCount: number;

  @OneToMany(() => Comment, (comment) => comment.board)
  comments: Comment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
