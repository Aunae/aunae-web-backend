import { Reply } from './../../reply/entities/reply.entities';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
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
import { UserAct } from './user-act.entities';
import { Board } from 'src/board/entities/board.entities';
import * as bcrypt from 'bcrypt';
import { bcryptConstants } from './types/user.enum';
import { Comment } from 'src/comment/entities/comment.entities';
import { Exclude } from 'class-transformer';
import { Role } from './types/user.role.enum';

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
  @MinLength(8)
  @MaxLength(125)
  @Exclude()
  @ApiProperty({ description: 'password' })
  password: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'coverImg' })
  coverImg?: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.MEMBER,
  })
  @IsOptional()
  @IsEnum(Role)
  @ApiProperty({ description: '권한' })
  role: Role;

  @OneToOne(() => UserAct)
  userAct: UserAct;

  @OneToMany(() => Board, (board) => board.author)
  boards: Board[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];

  @OneToMany(() => Reply, (reply) => reply.author)
  replies: Reply[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    const salt = await bcrypt.genSalt(bcryptConstants.HASH_ROUNDS);
    this.password = await bcrypt.hash(this.password, salt);
  }
}
