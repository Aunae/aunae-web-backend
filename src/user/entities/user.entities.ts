import { IsEmail, IsOptional, IsString } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserAct } from './userAct.entities';
import { Board } from 'src/board/entities/board.entities';
import * as bcrypt from 'bcrypt';
import { bcryptConstants } from './types/user.enum';
import { Comment } from 'src/comment/entities/comment.entities';
import { Exclude } from 'class-transformer';

@Entity({ name: 'user' })
@Unique(['username', 'email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  @IsString()
  @ApiProperty({ description: 'id' })
  id: string;

  @Column()
  @IsString()
  @ApiProperty({ description: 'username' })
  username: string;

  @Column()
  @IsEmail()
  @ApiProperty({ description: 'email' })
  email: string;

  @Column()
  @IsString()
  @Exclude()
  @ApiProperty({ description: 'password' })
  password: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'coverImg' })
  coverImg?: string;

  @OneToOne(() => UserAct)
  @JoinColumn() // 🤔
  userAct: UserAct;

  @OneToMany(() => Board, (board) => board.author)
  boards: Board[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    const salt = await bcrypt.genSalt(bcryptConstants.HASH_ROUNDS);
    this.password = await bcrypt.hash(this.password, salt);
  }
}
